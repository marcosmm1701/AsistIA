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
              Estamos arrancando
            </span>

            {/* Headline */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-[#f5f0e8] leading-tight mb-6">
              Buscamos clínicas
              <br />
              <span className="italic text-gradient-gold">fundadoras.</span>
            </h2>

            <p className="text-[#9a9080] text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              AsistIA está abriendo plazas para clínicas piloto en Madrid y Barcelona.
              A cambio de tu feedback en los primeros meses, te quedas con tarifa
              fundadora de por vida. Primer mes gratis, sin permanencia.
            </p>

            {/* CTA */}
            <button
              onClick={onOpenModal}
              className="group relative inline-flex items-center gap-3 bg-[#c9a96e] hover:bg-[#dbbe8a] text-[#0f0e0d] font-semibold px-10 py-5 rounded-2xl text-lg transition-all duration-200 hover:shadow-2xl hover:shadow-[#c9a96e]/30 hover:-translate-y-1"
            >
              Quiero ser clínica fundadora
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>

            {/* Micro-copy */}
            <p className="text-[#6b6258] text-sm mt-5">
              Sin compromiso · Primer mes gratis · Activo en 48h
            </p>

            {/* Bottom reasegurances — todo verificable, sin números inventados */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mt-12 pt-10 border-t border-[#2a2520]">
              {[
                { label: 'Hecho en España', icon: '🇪🇸' },
                { label: 'Soporte en español', icon: '💬' },
                { label: 'Sin permanencia', icon: '✓' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[#9a9080]">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
