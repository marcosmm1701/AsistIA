'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

// Problemas reales del sector descritos sin estadísticas inventadas.
// Cada "headline" es una frase observacional o un dato fácil de verificar
// por la propia clínica (mirar su WhatsApp y comprobarlo).
const problems = [
  {
    headline: '22:43',
    title: 'La hora a la que llegan los mensajes',
    description:
      'Las leads escriben en su tiempo libre: por las noches, los domingos, en festivos. Justo cuando tu equipo no está. Sin respuesta, se enfrían.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
  },
  {
    headline: 'Minutos',
    title: 'Lo que tienes antes de que se enfríe la lead',
    description:
      'Cualquier comercial te lo dirá: cuanto más tardas, menos cierras. Una lead que tarda horas en recibir respuesta ya está hablando con otra clínica.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    headline: 'A la vez',
    title: 'Tratar pacientes y vender, imposible',
    description:
      'Tu equipo es excepcional en tratamientos. Pero nadie puede atender un paciente y contestar mensajes al mismo tiempo. Y a ti no te pagan por ser recepcionista.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
]

function ProblemCard({
  problem,
  index,
}: {
  problem: (typeof problems)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative group"
    >
      <div className="border border-[#2a2520] group-hover:border-[#c9a96e]/30 rounded-2xl p-8 bg-[#141210] transition-all duration-300 h-full">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e] mb-6">
          {problem.icon}
        </div>

        {/* Headline */}
        <div className="font-serif text-5xl font-semibold text-gradient-gold mb-3">
          {problem.headline}
        </div>

        {/* Title */}
        <h3 className="text-[#f5f0e8] font-medium text-lg mb-3 leading-snug">
          {problem.title}
        </h3>

        {/* Description */}
        <p className="text-[#9a9080] text-sm leading-relaxed">
          {problem.description}
        </p>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 40px rgba(201,169,110,0.04)' }} />
      </div>
    </motion.div>
  )
}

export default function Problems() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-padding px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-[#c9a96e] font-medium tracking-widest uppercase mb-4 block">
            El problema
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#f5f0e8] leading-tight">
            Si no atiendes una lead,
            <br />
            <span className="italic text-gradient-gold">la atiende la clínica de al lado</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <ProblemCard key={i} problem={problem} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
