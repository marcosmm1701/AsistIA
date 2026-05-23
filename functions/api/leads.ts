/**
 * Cloudflare Pages Function — POST /api/leads
 *
 * Recibe el formulario de demo, valida y sanitiza server-side, y reenvía
 * la lead a un bot de Telegram. Diseñado con defensa en profundidad:
 *
 *  - Token de Telegram en variables de entorno (NUNCA en el navegador).
 *  - Validación + sanitización duplicada del cliente (allow-list, maxLen,
 *    strip CR/LF, regex). El cliente puede ser manipulado, este endpoint
 *    es la frontera de confianza real.
 *  - Verificación de Origin (anti-CSRF).
 *  - Mensajes de error genéricos (no filtran información interna).
 *  - Honeypot: si el bot rellena el campo "website", devolvemos 200 OK
 *    silenciosamente para no darle pistas.
 *
 * Variables de entorno requeridas (configurar en Cloudflare Pages):
 *  - TELEGRAM_BOT_TOKEN: token de tu bot (de @BotFather)
 *  - TELEGRAM_CHAT_ID:   tu chat_id (numérico)
 *  - ALLOWED_ORIGIN:     URL de origen permitida, p.ej. https://asistia.es
 */

interface Env {
  TELEGRAM_BOT_TOKEN: string
  TELEGRAM_CHAT_ID: string
  ALLOWED_ORIGIN: string
}

const LEAD_OPTIONS = ['menos-20', '20-50', '50-100', 'mas-100']
const LEAD_LABELS: Record<string, string> = {
  'menos-20': 'Menos de 20',
  '20-50': '20 – 50',
  '50-100': '50 – 100',
  'mas-100': 'Más de 100',
}

// Caracteres de control que pueden romper o inyectar en cualquier
// downstream (logs, emails, mensajes). Los reemplazamos por espacio.
function sanitize(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return ''
  return value.replace(/[\r\n\t\0\x00-\x1F\x7F]/g, ' ').trim().slice(0, maxLen)
}

type Validated =
  | { ok: true; safe: Record<string, string>; isSpam: false }
  | { ok: true; safe: null; isSpam: true }
  | { ok: false; error: string }

function validate(data: unknown): Validated {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'invalid_payload' }
  }
  const d = data as Record<string, unknown>

  // Honeypot: bots rellenan campos ocultos. Silenciamos para no avisarles.
  if (typeof d.website === 'string' && d.website.length > 0) {
    return { ok: true, safe: null, isSpam: true }
  }

  const safe = {
    nombre: sanitize(d.nombre, 60),
    clinica: sanitize(d.clinica, 80),
    telefono: sanitize(d.telefono, 20),
    email: sanitize(d.email, 100),
    ciudad: sanitize(d.ciudad, 40),
    leads: sanitize(d.leads, 20),
  }

  if (!safe.nombre || !safe.clinica || !safe.telefono || !safe.email || !safe.ciudad) {
    return { ok: false, error: 'missing_field' }
  }

  // Allow-list por campo (mismo regex que el cliente, duplicado por seguridad).
  if (!/^[\p{L}\s'.-]{2,60}$/u.test(safe.nombre)) {
    return { ok: false, error: 'invalid_nombre' }
  }
  if (!/^[\p{L}\p{N}\s&.,'-]{2,80}$/u.test(safe.clinica)) {
    return { ok: false, error: 'invalid_clinica' }
  }
  if (!/^[+\d\s()-]{9,20}$/.test(safe.telefono)) {
    return { ok: false, error: 'invalid_telefono' }
  }
  if (!/^[^\s@<>"'`;()]+@[^\s@<>"'`;()]+\.[^\s@<>"'`;()]{2,}$/.test(safe.email)) {
    return { ok: false, error: 'invalid_email' }
  }
  if (!/^[\p{L}\s'-]{2,40}$/u.test(safe.ciudad)) {
    return { ok: false, error: 'invalid_ciudad' }
  }
  if (!LEAD_OPTIONS.includes(safe.leads)) {
    return { ok: false, error: 'invalid_leads' }
  }

  return { ok: true, safe, isSpam: false }
}

function json(status: number, body: unknown, origin: string | null): Response {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  }
  // CORS solo para el propio origen (defensa adicional).
  if (origin) headers['Access-Control-Allow-Origin'] = origin
  return new Response(JSON.stringify(body), { status, headers })
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const origin = request.headers.get('Origin')

  // 1. CSRF defense: solo aceptamos POST desde nuestro origen.
  //    Si ALLOWED_ORIGIN no está configurado, rechazamos en lugar de permitir todo.
  if (!env.ALLOWED_ORIGIN) {
    return json(500, { ok: false, error: 'misconfigured' }, null)
  }
  if (origin !== env.ALLOWED_ORIGIN) {
    return json(403, { ok: false, error: 'forbidden' }, null)
  }

  // 2. Content-Type obligatorio (mitiga form-based CSRF).
  const contentType = request.headers.get('Content-Type') || ''
  if (!contentType.includes('application/json')) {
    return json(400, { ok: false, error: 'bad_request' }, origin)
  }

  // 3. Límite de tamaño del body: 4 KB es más que suficiente para este form.
  //    Evita ataques de DoS con payloads gigantes.
  const contentLength = Number(request.headers.get('Content-Length') || '0')
  if (contentLength > 4096) {
    return json(413, { ok: false, error: 'payload_too_large' }, origin)
  }

  // 4. Parse JSON.
  let data: unknown
  try {
    data = await request.json()
  } catch {
    return json(400, { ok: false, error: 'bad_request' }, origin)
  }

  // 5. Validar.
  const result = validate(data)
  if (!result.ok) {
    return json(400, { ok: false, error: result.error }, origin)
  }
  if (result.isSpam) {
    // 200 OK silencioso: el bot piensa que tuvo éxito y no reintenta.
    return json(200, { ok: true }, origin)
  }

  const { safe } = result

  // 6. Verificar configuración del bot ANTES de procesar (fail closed).
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return json(500, { ok: false, error: 'misconfigured' }, null)
  }

  // 7. Mensaje en texto plano (sin parse_mode → no necesita escapado de
  //    caracteres especiales; cualquier contenido del usuario es seguro
  //    porque Telegram lo trata como texto literal).
  const lines = [
    '🎯 NUEVA DEMO SOLICITADA',
    '',
    `👤 Nombre: ${safe.nombre}`,
    `🏥 Clínica: ${safe.clinica}`,
    `📱 Teléfono: ${safe.telefono}`,
    `📧 Email: ${safe.email}`,
    `📍 Ciudad: ${safe.ciudad}`,
    `📊 Leads/mes: ${LEAD_LABELS[safe.leads] || safe.leads}`,
    '',
    `🕐 ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}`,
  ]
  const text = lines.join('\n')

  // 8. Enviar a Telegram con timeout (no bloquear si su API cae).
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  try {
    const tgResponse = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text,
          disable_web_page_preview: true,
        }),
        signal: controller.signal,
      },
    )
    clearTimeout(timeout)

    if (!tgResponse.ok) {
      // No exponemos detalles del fallo al cliente.
      return json(502, { ok: false, error: 'delivery_failed' }, origin)
    }
  } catch {
    clearTimeout(timeout)
    return json(502, { ok: false, error: 'delivery_failed' }, origin)
  }

  return json(200, { ok: true }, origin)
}

// Preflight CORS (por si en algún momento se llama desde un origen distinto).
export const onRequestOptions: PagesFunction<Env> = async ({ request, env }) => {
  const origin = request.headers.get('Origin')
  if (!env.ALLOWED_ORIGIN || origin !== env.ALLOWED_ORIGIN) {
    return new Response(null, { status: 403 })
  }
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
}

// Bloqueamos cualquier otro método.
export const onRequest: PagesFunction<Env> = async () =>
  new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST, OPTIONS' } })
