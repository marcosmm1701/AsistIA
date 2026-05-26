# Despliegue en Cloudflare Pages — Paso a paso

## Stack
- Next.js 14 con `output: 'export'` → genera HTML/CSS/JS estático en `/out`
- Cloudflare Pages sirve esa carpeta estática (sin Workers, sin edge runtime)

---

## Opción A — Dashboard de Cloudflare (recomendado, sin CLI)

### 1. Sube el repositorio a GitHub

```bash
git add .
git commit -m "feat: initial AsistIA website"
git remote add origin https://github.com/tu-usuario/citalia-web.git
git push -u origin main
```

### 2. Crea el proyecto en Cloudflare Pages

1. Ve a [dash.cloudflare.com](https://dash.cloudflare.com)
2. En el menú lateral: **Workers & Pages** → **Create**
3. Selecciona **Pages** → **Connect to Git**
4. Autoriza GitHub y elige el repositorio

### 3. Configuración del build — CRÍTICO

En la pantalla "Set up builds and deployments" usa exactamente estos valores:

| Campo | Valor |
|-------|-------|
| **Framework preset** | `None` ← **NO selecciones Next.js** |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Root directory** | *(dejar vacío)* |
| **Node.js version** | `18` o `20` |

> ⚠️ Si seleccionas el preset "Next.js", Cloudflare intentará usar Workers/edge
> en lugar del export estático, lo que causa el error de versión de Wrangler.
> Con preset **None** + output directory **out** funciona perfectamente.

### 4. Guarda y despliega

Clic en **Save and Deploy**. El primer build tarda ~1-2 minutos.

---

## Opción B — Wrangler CLI (deploy manual)

```bash
# 1. Genera el build estático
npm run build

# 2. Instala Wrangler globalmente
npm install -g wrangler

# 3. Autentícate en Cloudflare
wrangler login

# 4. Despliega SOLO la carpeta /out (Pages estático)
wrangler pages deploy out --project-name=citalia-web
```

> ⚠️ Usa `wrangler pages deploy out`, NO `wrangler deploy`.
> El segundo es para Workers (distinto servicio), no para Pages estáticas.

---

## Dominio personalizado

1. En tu proyecto de Cloudflare Pages → pestaña **Custom domains**
2. **Set up a custom domain** → introduce `asistia.es`
3. Si el dominio está en Cloudflare: configuración automática (~1 min)
4. Si está en otro registrador: añade los registros DNS que Cloudflare indica

---

## Actualizaciones futuras

Con la Opción A, cada `git push` a `main` redespliega automáticamente.

Con la Opción B:
```bash
npm run build && wrangler pages deploy out --project-name=citalia-web
```

---

## Conectar el formulario a n8n / CRM

En [components/DemoModal.tsx](components/DemoModal.tsx), busca el comentario `// Option A` (~línea 75) y descomenta:

```ts
await fetch('https://tu-n8n.example.com/webhook/asistia-leads', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' }
})
```

El payload que envía el formulario:
```json
{
  "nombre": "Ana García",
  "clinica": "Clínica Estética Belleza",
  "telefono": "+34 600 000 000",
  "email": "ana@clinica.es",
  "ciudad": "Madrid",
  "leads": "20-50"
}
```
