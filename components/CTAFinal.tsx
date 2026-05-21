'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface CTAFinalProps {
  onOpenModal: () => void
}

export default function CTAFinal({ onOpenModal }: CTAFinalProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-padding px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-[#141210] border border-[#c9a96e]/20" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.12) 0%, transparent 60%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center py-16 md:py-20 px-8">
            {/* Label */}
            <span className="text-xs text-[#c9a96e] font-medium tracking-widest uppercase mb-6 block">
              Última pregunta
            </span>

            {/* Headline */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-[#f5f0e8] leading-tight mb-6">
              ¿Tu competencia
              <br />
              <span className="italic text-gradient-gold">ya lo está usando?</span>
            </h2>

            <p className="text-[#9a9080] text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              Cada semana que pasa sin atender leads automáticamente son pacientes que
              van a otra clínica. El primer mes es gratis. No hay excusa para no probarlo.
            </p>

            {/* CTA */}
            <button
              onClick={onOpenModal}
              className="group relative inline-flex items-center gap-3 bg-[#c9a96e] hover:bg-[#dbbe8a] text-[#0f0e0d] font-semibold px-10 py-5 rounded-2xl text-lg transition-all duration-200 hover:shadow-2xl hover:shadow-[#c9a96e]/30 hover:-translate-y-1"
            >
              Reserva tu demo gratuita
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>

            {/* Micro-copy */}
            <p className="text-[#6b6258] text-sm mt-5">
              Sin compromiso · Primer mes gratis · Activo en 48h
            </p>

            {/* Bottom divider */}
            <div className="flex items-center justify-center gap-6 mt-12 pt-10 border-t border-[#2a2520]">
              {[
                { label: 'Clínicas activas', value: '12+' },
                { label: 'Leads atendidos', value: '4.800+' },
                { label: 'Citas generadas', value: '310+' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-serif text-2xl font-semibold text-[#c9a96e]">{stat.value}</div>
                  <div className="text-xs text-[#6b6258]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
