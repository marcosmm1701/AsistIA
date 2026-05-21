'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function useCounter(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])

  return count
}

const metrics = [
  {
    prefix: '+',
    value: 73,
    suffix: '%',
    label: 'de leads atendidos en menos de 1 minuto',
    description: 'Frente al 12% de media en clínicas sin automatización',
  },
  {
    prefix: '',
    value: 8,
    suffix: '',
    label: 'pacientes nuevos/mes de media por clínica',
    description: 'Entre 3 y 8 pacientes adicionales mensual, según volumen de leads',
  },
  {
    prefix: '',
    value: 0,
    suffix: '€',
    label: 'coste de setup, activo en 48 horas',
    description: 'Integración completa incluida. Sin inversión inicial.',
  },
]

function MetricCard({
  metric,
  index,
  started,
}: {
  metric: (typeof metrics)[0]
  index: number
  started: boolean
}) {
  const count = useCounter(metric.value, 2000, started)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="text-center"
    >
      {/* Number */}
      <div className="font-serif text-6xl md:text-7xl font-semibold text-gradient-gold mb-3">
        {metric.prefix}
        {count}
        {metric.suffix}
      </div>

      {/* Label */}
      <p className="text-[#f5f0e8] font-medium text-base md:text-lg mb-2 max-w-[200px] mx-auto leading-tight">
        {metric.label}
      </p>

      {/* Description */}
      <p className="text-[#6b6258] text-sm max-w-[220px] mx-auto">
        {metric.description}
      </p>

      {/* Divider (not on last) */}
      {index < metrics.length - 1 && (
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-24 bg-[#2a2520]" />
      )}
    </motion.div>
  )
}

export default function Results() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="resultados" className="section-padding px-6">
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
            Resultados
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#f5f0e8] leading-tight">
            Números que hablan
            <br />
            <span className="italic text-gradient-gold">por sí solos</span>
          </h2>
        </motion.div>

        {/* Metrics */}
        <div className="border border-[#2a2520] rounded-2xl bg-[#141210] px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 relative">
            {metrics.map((metric, i) => (
              <div key={i} className="relative">
                <MetricCard metric={metric} index={i} started={isInView} />
                {i < metrics.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-20 bg-[#2a2520]" />
                )}
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-[#6b6258] mt-10 pt-6 border-t border-[#2a2520]">
            * Datos basados en resultados de clínicas piloto durante los primeros 3 meses de uso
          </p>
        </div>
      </div>
    </section>
  )
}
