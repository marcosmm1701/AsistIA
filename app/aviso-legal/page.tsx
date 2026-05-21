import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Aviso legal y condiciones de uso de AsistIA.',
}

export default function AvisoLegal() {
  return (
    <div className="min-h-screen bg-[#0f0e0d] px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[#c9a96e] text-sm hover:underline mb-8 inline-block">
          ← Volver al inicio
        </Link>

        <h1 className="font-serif text-4xl font-semibold text-[#f5f0e8] mb-2">Aviso Legal</h1>
        <p className="text-[#6b6258] text-sm mb-10">Última actualización: enero de 2025</p>

        <div className="prose prose-invert max-w-none space-y-8 text-[#9a9080] text-sm leading-relaxed">

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">1. Identificación del titular</h2>
            <p>
              En cumplimiento con el deber de información dispuesto en la Ley 34/2002 de Servicios de la
              Sociedad de la Información y del Comercio Electrónico (LSSICE), se facilitan los siguientes
              datos de identificación:
            </p>
            <ul className="list-none mt-3 space-y-1">
              <li><strong className="text-[#e8dcc8]">Denominación social:</strong> AsistIA (en proceso de constitución como S.L.)</li>
              <li><strong className="text-[#e8dcc8]">Domicilio social:</strong> Madrid, España</li>
              <li><strong className="text-[#e8dcc8]">Email:</strong> hola@asistia.es</li>
              <li><strong className="text-[#e8dcc8]">Sitio web:</strong> https://asistia.es</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">2. Objeto y ámbito de aplicación</h2>
            <p>
              El presente Aviso Legal regula el acceso y el uso del sitio web asistia.es, cuya titularidad
              corresponde a AsistIA. El acceso a este sitio web y la utilización de sus servicios implica la
              aceptación plena y sin reservas de las presentes condiciones.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">3. Propiedad intelectual e industrial</h2>
            <p>
              Todos los contenidos del sitio web —incluyendo textos, imágenes, logotipos, iconos, código
              fuente y diseño gráfico— son propiedad de AsistIA o de terceros que han autorizado su uso.
              Queda prohibida su reproducción, distribución, comunicación pública o transformación sin
              autorización expresa y por escrito del titular.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">4. Responsabilidad</h2>
            <p>
              AsistIA no se responsabiliza de los daños y perjuicios de cualquier naturaleza que pudieran
              ocasionarse por la disponibilidad, continuidad, calidad o exactitud de los contenidos del
              sitio web. El usuario acepta que el uso del sitio web se realiza bajo su propia
              responsabilidad.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">5. Legislación aplicable y jurisdicción</h2>
            <p>
              Las presentes condiciones se rigen por la legislación española. Para la resolución de
              cualquier controversia derivada de la utilización de este sitio web, las partes se someten a
              los juzgados y tribunales de la ciudad de Madrid, con renuncia expresa a cualquier otro fuero
              que pudiera corresponderles.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
