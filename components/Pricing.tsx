'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface PricingProps {
  onOpenModal: () => void
}

// Plan disponible hoy — atención por texto (WhatsApp + Instagram + formulario web)
const textFeatures = [
  { text: 'Primer mes completamente gratis', highlight: true },
  { text: 'Sin permanencia — cancela cuando quieras', highlight: false },
  { text: 'Setup e integración incluidos (48h)', highlight: false },
  { text: 'WhatsApp Business + Instagram DMs', highlight: false },
  { text: 'Integración con tu formulario web (WordPress, Webflow…)', highlight: false },
  { text: 'Personalización de respuestas a tu clínica', highlight: false },
  { text: 'Soporte dedicado por WhatsApp', highlight: false },
  { text: 'Panel de conversaciones y métricas', highlight: false },
]

// Plan futuro — atención por voz (llamadas telefónicas)
const voiceFeatures = [
  { text: 'Todo lo del plan Texto', highlight: false },
  { text: 'Atención de llamadas entrantes 24/7', highlight: false },
  { text: 'Confirmación y reprogramación de citas por voz', highlight: false },
  { text: 'Recordatorios automáticos por teléfono', highlight: false },
  { text: 'Voz natural en español', highlight: false },
]

export default function Pricing({ onOpenModal }: PricingProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="precios" className="section-padding px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-[#c9a96e] font-medium tracking-widest uppercase mb-4 block">
            Precios
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#f5f0e8] leading-tight">
            Precio simple,
            <br />
            <span className="italic text-gradient-gold">sin sorpresas</span>
          </h2>
        </motion.div>

        {/* Grid de dos tarjetas: plan actual (Texto) + plan futuro (Voz) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* === Plan TEXTO (disponible hoy) === */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative border border-[#c9a96e]/40 rounded-3xl p-8 md:p-10 bg-[#141210] overflow-hidden h-full flex flex-col">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-radial from-[#c9a96e]/5 via-transparent to-transparent pointer-events-none" />

              {/* Badge */}
              <div className="absolute top-6 right-6">
                <span className="bg-[#c9a96e] text-[#0f0e0d] text-xs font-bold px-3 py-1 rounded-full">
                  Primer mes GRATIS
                </span>
              </div>

              {/* Plan name */}
              <div className="mb-2 relative z-10">
                <span className="text-xs text-[#c9a96e] font-medium tracking-widest uppercase">
                  Citalia · Texto
                </span>
              </div>

              {/* Price */}
              <div className="mb-8 relative z-10">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-serif text-7xl font-semibold text-gradient-gold">349</span>
                  <span className="text-2xl text-[#9a9080] font-medium">€<span className="text-lg">/mes</span></span>
                </div>
                <p className="text-[#6b6258] text-sm">
                  después del primer mes gratuito · sin permanencia
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#2a2520] mb-8" />

              {/* Features */}
              <ul className="space-y-4 mb-8 flex-grow">
                {textFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        feature.highlight
                          ? 'bg-[#c9a96e] text-[#0f0e0d]'
                          : 'bg-[#c9a96e]/15 border border-[#c9a96e]/30'
                      }`}
                    >
                      <svg className="w-3 h-3 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span
                      className={`text-sm leading-relaxed ${
                        feature.highlight ? 'text-[#c9a96e] font-medium' : 'text-[#9a9080]'
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={onOpenModal}
                className="w-full bg-[#c9a96e] hover:bg-[#dbbe8a] text-[#0f0e0d] font-semibold py-4 rounded-2xl text-base transition-all duration-200 hover:shadow-xl hover:shadow-[#c9a96e]/25 hover:-translate-y-0.5 relative z-10"
              >
                Empezar gratis →
              </button>

              <p className="text-center text-xs text-[#6b6258] mt-4 relative z-10">
                Sin tarjeta de crédito · Cancela en cualquier momento
              </p>
            </div>
          </motion.div>

          {/* === Plan VOZ (próximamente) === */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative border border-dashed border-[#2a2520] rounded-3xl p-8 md:p-10 bg-[#0f0e0d] overflow-hidden h-full flex flex-col">
              {/* Badge */}
              <div className="absolute top-6 right-6">
                <span className="bg-[#2a2520] text-[#c9a96e] text-xs font-bold px-3 py-1 rounded-full border border-[#c9a96e]/30">
                  Próximamente
                </span>
              </div>

              {/* Plan name */}
              <div className="mb-2">
                <span className="text-xs text-[#6b6258] font-medium tracking-widest uppercase">
                  Citalia · Voz
                </span>
              </div>

              {/* Price placeholder */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-serif text-5xl md:text-6xl font-semibold text-[#6b6258]">
                    Próximamente
                  </span>
                </div>
                <p className="text-[#6b6258] text-sm">
                  Citalia que también atiende y gestiona citas por llamada telefónica
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#2a2520] mb-8" />

              {/* Features */}
              <ul className="space-y-4 mb-8 flex-grow">
                {voiceFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#2a2520] border border-[#3a352e] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#6b6258]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-sm leading-relaxed text-[#6b6258]">
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA secundario — el modal sirve también para "avisarme cuando salga" */}
              <button
                onClick={onOpenModal}
                className="w-full border border-[#2a2520] hover:border-[#c9a96e]/40 text-[#9a9080] hover:text-[#f5f0e8] font-medium py-4 rounded-2xl text-base transition-all duration-200"
              >
                Avísame cuando esté listo
              </button>

              <p className="text-center text-xs text-[#6b6258] mt-4">
                Te escribimos en cuanto abramos el plan Voz
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-[#6b6258] text-sm">
            ¿Necesitas una propuesta personalizada para tu clínica?{' '}
            <button onClick={onOpenModal} className="text-[#c9a96e] hover:underline">
              Hablemos
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
