# Despliegue en Cloudflare Pages — Paso a paso

## Prerrequisitos
- Cuenta en [Cloudflare](https://dash.cloudflare.com)
- Repositorio en GitHub/GitLab con este proyecto
- Node.js 18+

---

## Opción A — Despliegue desde Git (recomendado)

### 1. Sube el repositorio a GitHub

```bash
git add .
git commit -m "feat: initial AsistIA website"
git remote add origin https://github.com/tu-usuario/asistia-web.git
git push -u origin main
```

### 2. Conecta con Cloudflare Pages

1. Ve a [dash.cloudflare.com](https://dash.cloudflare.com)
2. Selecciona tu cuenta → **Workers & Pages**
3. Clic en **Create application** → **Pages** → **Connect to Git**
4. Autoriza GitHub y selecciona el repositorio `asistia-web`

### 3. Configuración del build

En la pantalla de configuración:

| Campo | Valor |
|-------|-------|
| Framework preset | `Next.js (Static HTML Export)` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | `/` (dejar vacío) |
| Node.js version | `18.x` |

### 4. Variables de entorno

No son necesarias por ahora. Si añades un endpoint de formulario más adelante:

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_FORM_ENDPOINT` | `https://tu-endpoint.com/leads` |

### 5. Despliega

Clic en **Save and Deploy**. El primer build tarda ~2 minutos.

---

## Opción B — Despliegue manual (sin Git)

```bash
# 1. Genera el build estático
npm run build

# 2. Instala Wrangler (CLI de Cloudflare)
npm install -g wrangler

# 3. Autentícate
wrangler login

# 4. Despliega la carpeta /out
wrangler pages deploy out --project-name=asistia-web
```

---

## Dominio personalizado

1. En Cloudflare Pages → tu proyecto → **Custom domains**
2. Clic en **Set up a custom domain**
3. Introduce `asistia.es` (o `www.asistia.es`)
4. Si el dominio está en Cloudflare: se configura automáticamente
5. Si está en otro registrador: añade los registros DNS indicados

---

## Actualizaciones futuras

Con la Opción A (Git), cada `git push` a la rama `main` despliega automáticamente.

Con la Opción B, repite el paso 4 con `wrangler pages deploy out`.

---

## Conectar el formulario a un CRM/n8n (pendiente)

En `components/DemoModal.tsx`, línea ~75, hay un comentario con la opción A:

```ts
// Descomenta y ajusta la URL de tu webhook de n8n:
await fetch('https://tu-n8n.example.com/webhook/asistia-leads', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' }
})
```

El formulario ya envía: `nombre`, `clinica`, `telefono`, `email`, `ciudad`, `leads`.
