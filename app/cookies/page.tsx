import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de cookies del sitio web Citalia. No utilizamos cookies de seguimiento.',
}

export default function Cookies() {
  return (
    <div className="min-h-screen bg-[#0f0e0d] px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[#c9a96e] text-sm hover:underline mb-8 inline-block">
          ← Volver al inicio
        </Link>

        <h1 className="font-serif text-4xl font-semibold text-[#f5f0e8] mb-2">Política de Cookies</h1>
        <p className="text-[#6b6258] text-sm mb-10">Última actualización: mayo de 2026</p>

        <div className="space-y-8 text-[#9a9080] text-sm leading-relaxed">

          <section className="border border-[#c9a96e]/20 rounded-2xl bg-[#c9a96e]/5 p-6">
            <h2 className="font-serif text-lg text-[#f5f0e8] mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Esta web no usa cookies
            </h2>
            <p className="text-[#e8dcc8] text-sm">
              Decisión consciente: no instalamos cookies de seguimiento, no usamos
              herramientas de analítica (Google Analytics u otras), ni cargamos píxeles
              de redes sociales o de publicidad.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que los sitios web almacenan en
              tu dispositivo durante tu visita. Sirven habitualmente para recordar
              preferencias, mantener sesiones iniciadas o hacer seguimiento de la
              navegación.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">2. Cookies en este sitio</h2>
            <p>
              Este sitio web es <strong className="text-[#e8dcc8]">una página estática</strong>{' '}
              sin uso de cookies propias ni de terceros. En concreto:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>No utilizamos Google Analytics, Meta Pixel ni ninguna herramienta de analítica.</li>
              <li>No instalamos píxeles de seguimiento publicitario.</li>
              <li>No almacenamos datos en tu navegador (ni cookies, ni localStorage, ni sessionStorage).</li>
              <li>Las fuentes tipográficas se sirven desde nuestro propio dominio (no desde fonts.googleapis.com), así que Google no recibe información de tu visita.</li>
            </ul>
            <p className="mt-3 text-[#6b6258]">
              Por este motivo no mostramos banner de cookies: no hay nada que aceptar ni
              rechazar.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">3. Servicios de terceros</h2>
            <p>
              Algunos componentes técnicos del sitio pueden, por su naturaleza, generar
              registros estándar:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li><strong className="text-[#e8dcc8]">Cloudflare</strong> (alojamiento) puede registrar logs técnicos (dirección IP, user-agent) durante un tiempo limitado por motivos de seguridad y protección frente a ataques. Esta información no se utiliza para hacer perfil de usuario.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">4. Cambios futuros</h2>
            <p>
              Si en el futuro decidimos incorporar herramientas que sí utilicen cookies,
              actualizaremos esta política y mostraremos el correspondiente banner de
              consentimiento conforme a la normativa AEPD vigente, antes de instalar
              ninguna cookie no estrictamente técnica.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">5. Contacto</h2>
            <p>
              Si tienes preguntas sobre esta política, escríbenos a{' '}
              <a href="mailto:hola@citaliaapp.com" className="text-[#c9a96e] hover:underline">
                hola@citaliaapp.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
