# Configurar las notificaciones de leads por Telegram

Esta guía te lleva de cero a "las leads me suenan en el móvil al instante" en ~10 minutos.

---

## Paso 1 — Crear el bot de Telegram

1. Abre Telegram en el móvil
2. Busca **@BotFather** (el oficial, con el ✓ azul)
3. Envía `/newbot`
4. Cuando te pida un nombre: `AsistIA Leads` (o el que quieras)
5. Cuando te pida un username: tiene que acabar en `bot`, por ejemplo `asistia_leads_bot`
6. **BotFather te devuelve un token** del estilo:
   ```
   7234567890:AAH8xK3pZ2vL9mN-qRsT5uVwXyZaBcDeFgH
   ```
7. **Guárdalo bien** — es la "contraseña" de tu bot. Si se filtra, alguien puede enviar spam o leer tus mensajes.

---

## Paso 2 — Obtener tu CHAT_ID

El bot necesita saber a quién enviarte los mensajes. Tu chat con el bot tiene un ID numérico.

1. En Telegram, busca el bot que acabas de crear (por su username, p.ej. `@asistia_leads_bot`)
2. Pulsa **Start** o envía cualquier mensaje, por ejemplo `hola`
3. Desde el navegador, abre esta URL (reemplazando `<TOKEN>` por el tuyo):
   ```
   https://api.telegram.org/bot<TOKEN>/getUpdates
   ```
4. Verás un JSON. Busca el campo `"chat":{"id": ...}`. Ese número (puede ser positivo o negativo) es tu **CHAT_ID**.

Ejemplo de respuesta:
```json
{
  "ok": true,
  "result": [{
    "message": {
      "chat": {
        "id": 123456789,
        "first_name": "Marcos",
        ...
      },
      ...
    }
  }]
}
```
Aquí el chat_id es `123456789`.

> Si el JSON sale vacío (`"result": []`), envía otro mensaje al bot y recarga la URL.

---

## Paso 3 — Configurar las variables de entorno en Cloudflare Pages

1. Ve al dashboard de Cloudflare → **Workers & Pages** → tu proyecto (`asistia-al4` o el nombre que uses)
2. Pestaña **Settings** → **Environment variables**
3. En **Production**, añade estas tres variables:

| Nombre | Valor | Cifrado |
|--------|-------|---------|
| `TELEGRAM_BOT_TOKEN` | El token de BotFather (paso 1) | ✅ **Encrypt** |
| `TELEGRAM_CHAT_ID` | Tu chat_id (paso 2) | ✅ Encrypt |
| `ALLOWED_ORIGIN` | `https://asistia-al4.pages.dev` (o tu dominio final) | No hace falta |

> ⚠️ **MUY IMPORTANTE**: marca "Encrypt" en `TELEGRAM_BOT_TOKEN`. Eso impide que el token sea visible en el dashboard una vez guardado. Si alguien con acceso al panel ve el token, puede secuestrar tu bot.

4. Pulsa **Save**

---

## Paso 4 — Redesplegar

Tras guardar las variables, **fuerza un redeploy** para que la Function las recoja:

- Pestaña **Deployments** → en el último deploy, pulsa los `...` → **Retry deployment**

O simplemente haz `git push` con cualquier cambio.

---

## Paso 5 — Probar

1. Abre tu web (ahora mismo `https://asistia-al4.pages.dev`)
2. Pulsa "Quiero una demo gratis"
3. Rellena el formulario con datos de prueba
4. Envía

En **menos de 2 segundos** debes recibir un mensaje en Telegram tipo:

```
🎯 NUEVA DEMO SOLICITADA

👤 Nombre: Ana García
🏥 Clínica: Clínica Belleza
📱 Teléfono: +34 600 000 000
📧 Email: ana@test.com
📍 Ciudad: Madrid
📊 Leads/mes: 20 – 50

🕐 21/5/2026 12:34:56
```

---

## Si algo falla

| Síntoma | Causa probable | Solución |
|---------|---------------|----------|
| Mensaje "Error de conexión" en la web | El JS no llega al endpoint | Comprueba que el dominio está en `ALLOWED_ORIGIN` |
| 403 Forbidden en el Network tab | `Origin` no coincide con `ALLOWED_ORIGIN` | Ajusta `ALLOWED_ORIGIN` exactamente igual a la URL (sin `/` final) |
| 502 Bad Gateway | Token de bot incorrecto o caducado | Genera un nuevo token con BotFather |
| El formulario envía pero no llega nada | `CHAT_ID` incorrecto | Repite el paso 2, asegúrate de incluir el signo negativo si lo hay |
| Web devuelve 500 "misconfigured" | Falta alguna variable de entorno | Verifica las 3 variables en Settings |

---

## Seguridad

- El token del bot **nunca** está en el navegador. Solo en variables de entorno cifradas del servidor.
- El endpoint verifica `Origin` → solo acepta peticiones desde tu propia web.
- Valida todos los campos otra vez en el servidor (allow-list por regex, longitudes máximas, sanitización de caracteres de control).
- Tiene timeout de 5 segundos a la API de Telegram (no se cuelga si Telegram cae).
- Devuelve errores genéricos al cliente (no filtra detalles internos).

---

## Cuando tengas dominio propio

Cuando vincules `asistia.es` (o el que sea), **acuérdate de actualizar `ALLOWED_ORIGIN`** en las variables de entorno, o el formulario empezará a devolver 403 desde el nuevo dominio.
