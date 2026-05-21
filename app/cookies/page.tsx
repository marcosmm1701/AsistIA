import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de cookies de AsistIA. Información sobre las cookies que utilizamos.',
}

export default function Cookies() {
  return (
    <div className="min-h-screen bg-[#0f0e0d] px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[#c9a96e] text-sm hover:underline mb-8 inline-block">
          ← Volver al inicio
        </Link>

        <h1 className="font-serif text-4xl font-semibold text-[#f5f0e8] mb-2">Política de Cookies</h1>
        <p className="text-[#6b6258] text-sm mb-10">Última actualización: enero de 2025</p>

        <div className="space-y-8 text-[#9a9080] text-sm leading-relaxed">

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que los sitios web colocan en tu dispositivo
              cuando los visitas. Se utilizan ampliamente para hacer funcionar los sitios web de manera más
              eficiente y para proporcionar información a los propietarios del sitio.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">2. Cookies que utilizamos</h2>
            <div className="border border-[#2a2520] rounded-xl overflow-hidden mt-3">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#141210] border-b border-[#2a2520]">
                    <th className="text-left px-4 py-3 text-[#f5f0e8] font-medium">Nombre</th>
                    <th className="text-left px-4 py-3 text-[#f5f0e8] font-medium">Tipo</th>
                    <th className="text-left px-4 py-3 text-[#f5f0e8] font-medium">Finalidad</th>
                    <th className="text-left px-4 py-3 text-[#f5f0e8] font-medium">Duración</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2520]">
                  <tr>
                    <td className="px-4 py-3 text-[#e8dcc8]">_session</td>
                    <td className="px-4 py-3">Técnica</td>
                    <td className="px-4 py-3">Mantener la sesión del usuario</td>
                    <td className="px-4 py-3">Sesión</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-[#e8dcc8]">_ga</td>
                    <td className="px-4 py-3">Analítica</td>
                    <td className="px-4 py-3">Google Analytics — análisis de tráfico anónimo</td>
                    <td className="px-4 py-3">2 años</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-[#e8dcc8]">cookie_consent</td>
                    <td className="px-4 py-3">Preferencia</td>
                    <td className="px-4 py-3">Recordar la aceptación de cookies</td>
                    <td className="px-4 py-3">1 año</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">3. Cookies de terceros</h2>
            <p>
              Este sitio web puede usar cookies de terceros como Google Analytics para analizar el tráfico
              de forma anónima. Dichos terceros tienen sus propias políticas de privacidad sobre cómo usan
              esta información.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">4. Cómo controlar las cookies</h2>
            <p>
              Puedes controlar y/o eliminar las cookies cuando lo desees. Puedes eliminar todas las cookies
              que ya están en tu ordenador y configurar la mayoría de los navegadores para que no las
              admitan. Sin embargo, si lo haces, es posible que tengas que ajustar manualmente algunas
              preferencias cada vez que visites el sitio.
            </p>
            <p className="mt-3">
              Puedes gestionar las cookies a través de la configuración de tu navegador:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Chrome: Configuración → Privacidad y seguridad → Cookies</li>
              <li>Firefox: Opciones → Privacidad y seguridad</li>
              <li>Safari: Preferencias → Privacidad</li>
              <li>Edge: Configuración → Privacidad, búsqueda y servicios</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">5. Más información</h2>
            <p>
              Si tienes preguntas sobre nuestra política de cookies, puedes contactarnos en{' '}
              <a href="mailto:hola@asistia.es" className="text-[#c9a96e] hover:underline">
                hola@asistia.es
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
