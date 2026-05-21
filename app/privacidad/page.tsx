import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad y protección de datos de AsistIA. RGPD compliant.',
}

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-[#0f0e0d] px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[#c9a96e] text-sm hover:underline mb-8 inline-block">
          ← Volver al inicio
        </Link>

        <h1 className="font-serif text-4xl font-semibold text-[#f5f0e8] mb-2">Política de Privacidad</h1>
        <p className="text-[#6b6258] text-sm mb-10">Última actualización: enero de 2025</p>

        <div className="space-y-8 text-[#9a9080] text-sm leading-relaxed">

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">1. Responsable del tratamiento</h2>
            <ul className="space-y-1">
              <li><strong className="text-[#e8dcc8]">Responsable:</strong> AsistIA</li>
              <li><strong className="text-[#e8dcc8]">Email de contacto:</strong> hola@asistia.es</li>
              <li><strong className="text-[#e8dcc8]">Domicilio:</strong> Madrid, España</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">2. Datos que recopilamos</h2>
            <p>Recopilamos los siguientes datos personales a través del formulario de solicitud de demo:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Nombre y apellidos</li>
              <li>Nombre de la clínica</li>
              <li>Número de teléfono (WhatsApp)</li>
              <li>Dirección de email</li>
              <li>Ciudad</li>
              <li>Volumen aproximado de leads mensuales</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">3. Finalidad y base jurídica</h2>
            <p>
              Los datos recabados se utilizan exclusivamente para contactar con el interesado en relación
              con la solicitud de demostración del servicio AsistIA (base jurídica: ejecución de
              medidas precontractuales, art. 6.1.b RGPD) y para el envío de comunicaciones comerciales
              sobre el servicio, siempre que el interesado haya dado su consentimiento (art. 6.1.a RGPD).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">4. Conservación de los datos</h2>
            <p>
              Los datos se conservarán durante el tiempo necesario para gestionar la solicitud y, en su
              caso, para el mantenimiento de la relación comercial. En ningún caso más de 3 años desde
              el último contacto.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">5. Cesión a terceros</h2>
            <p>
              No cedemos datos personales a terceros salvo obligación legal. Los datos pueden ser
              tratados por encargados del tratamiento (herramientas de CRM, plataformas de
              automatización) que actúan bajo contrato y garantías de conformidad con el RGPD.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">6. Derechos del interesado</h2>
            <p>Puedes ejercer los siguientes derechos enviando un email a hola@asistia.es:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Derecho de acceso a tus datos personales</li>
              <li>Derecho de rectificación de datos inexactos</li>
              <li>Derecho de supresión ("derecho al olvido")</li>
              <li>Derecho de oposición al tratamiento</li>
              <li>Derecho a la limitación del tratamiento</li>
              <li>Derecho a la portabilidad de los datos</li>
            </ul>
            <p className="mt-3">
              También tienes derecho a presentar una reclamación ante la Agencia Española de Protección
              de Datos (www.aepd.es).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#f5f0e8] mb-3">7. Seguridad</h2>
            <p>
              AsistIA aplica medidas técnicas y organizativas adecuadas para proteger los datos personales
              contra el acceso no autorizado, pérdida o destrucción accidental.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
