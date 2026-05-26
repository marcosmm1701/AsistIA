import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Aviso legal y condiciones de uso del sitio web Citalia.',
}

export default function AvisoLegal() {
  return (
    <div className="min-h-screen bg-[#0f0e0d] px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[#c9a96e] text-sm hover:underline mb-8 inline-block">
          ← Volver al inicio
        </Link>

        <h1 className="font-serif text-4xl font-semibold text-[#f5f0e8] mb-2">Aviso Legal</h1>
        <p className="text-[#6b6258] text-sm mb-10">Última actualización: mayo de 2026</p>

        <div className="space-y-8 text-[#9a9080] text-sm leading-relaxed">

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">1. Información general</h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002 de Servicios de la Sociedad
              de la Información y del Comercio Electrónico (LSSI-CE), se informa de los
              siguientes datos del responsable del sitio web:
            </p>
            <ul className="list-none mt-3 space-y-1">
              <li><strong className="text-[#e8dcc8]">Titular:</strong> Marcos Muñoz</li>
              <li><strong className="text-[#e8dcc8]">Naturaleza:</strong> Persona física</li>
              <li><strong className="text-[#e8dcc8]">Sitio web:</strong> https://citaliaapp.com</li>
              <li><strong className="text-[#e8dcc8]">Email de contacto:</strong> hola@citaliaapp.com</li>
            </ul>
            <p className="mt-4 text-[#6b6258]">
              Citalia es un proyecto en fase de validación. Actualmente no constituye una
              actividad económica formalizada (no S.L., no autónomo dado de alta).
              Cualquier servicio prestado durante esta etapa tiene carácter piloto y queda
              sujeto a la formalización societaria que se realice cuando el proyecto pase a
              fase comercial.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">2. Objeto</h2>
            <p>
              Este aviso legal regula el acceso y uso del sitio web citaliaapp.com. La
              navegación por este sitio implica la aceptación plena de estas condiciones.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">3. Uso del sitio</h2>
            <p>
              El usuario se compromete a hacer un uso adecuado de los contenidos y
              servicios y a no emplearlos para incurrir en actividades ilícitas, lesivas
              de derechos o intereses de terceros, ni que dañen el sitio web o impidan su
              normal utilización.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">4. Propiedad intelectual</h2>
            <p>
              Todos los contenidos (textos, imágenes, código fuente, diseño) son propiedad
              del titular o de terceros que han autorizado su uso. Queda prohibida su
              reproducción, distribución o transformación sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">5. Responsabilidad</h2>
            <p>
              La información contenida en este sitio web tiene carácter meramente
              informativo y promocional. El titular no garantiza la disponibilidad
              ininterrumpida del servicio ni se hace responsable de daños derivados del
              uso del sitio o de la imposibilidad de uso.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">6. Modificaciones</h2>
            <p>
              El titular se reserva el derecho a modificar el presente aviso legal y los
              servicios ofrecidos en cualquier momento, sin previo aviso. Los cambios
              entrarán en vigor desde su publicación en el sitio web.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">7. Legislación aplicable</h2>
            <p>
              Las presentes condiciones se rigen por la legislación española. Para la
              resolución de cualquier controversia, las partes se someten a los juzgados y
              tribunales que correspondan según la normativa de consumidores aplicable.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
