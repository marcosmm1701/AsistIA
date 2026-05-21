'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

interface FormData {
  nombre: string
  clinica: string
  telefono: string
  email: string
  ciudad: string
  leads: string
}

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  function handleClose() {
    onClose()
    setTimeout(() => {
      setSubmitted(false)
      reset()
    }, 300)
  }

  async function onSubmit(data: FormData) {
    setSubmitting(true)

    // Build mailto link as fallback — replace with your API/n8n endpoint
    const body = Object.entries(data)
      .map(([k, v]) => `${k}: ${v}`)
      .join('%0A')

    // Option A: Send to a simple endpoint (uncomment and configure)
    // await fetch('/api/leads', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })

    // Option B: Open mailto (works without backend)
    window.location.href = `mailto:hola@asistia.es?subject=Demo%20gratuita%20-%20${encodeURIComponent(data.clinica)}&body=${body}`

    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  const inputClass =
    'w-full bg-[#0f0e0d] border border-[#2a2520] focus:border-[#c9a96e]/60 rounded-xl px-4 py-3.5 text-[#f5f0e8] text-sm placeholder-[#6b6258] outline-none transition-colors duration-200'

  const errorClass = 'text-red-400 text-xs mt-1'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-[#141210] border border-[#2a2520] rounded-3xl w-full max-w-lg shadow-2xl shadow-black/60 pointer-events-auto max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-8 pb-0">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-[#f5f0e8] mb-1">
                    {submitted ? '¡Perfecto! 🎉' : 'Solicita tu demo gratuita'}
                  </h2>
                  <p className="text-[#9a9080] text-sm">
                    {submitted
                      ? 'Te contactamos en menos de 24 horas'
                      : 'Sin compromiso · Primer mes completamente gratis'}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-[#2a2520] flex items-center justify-center text-[#9a9080] hover:text-[#f5f0e8] transition-colors flex-shrink-0 ml-4"
                  aria-label="Cerrar"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-8">
                {submitted ? (
                  /* Success state */
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-[#c9a96e]/20 border border-[#c9a96e]/40 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-[#c9a96e]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <p className="text-[#9a9080] text-sm leading-relaxed max-w-sm mx-auto">
                      Hemos recibido tu solicitud. Un especialista de AsistIA te escribirá
                      por WhatsApp en menos de 24 horas para acordar la demo.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-8 bg-[#c9a96e] text-[#0f0e0d] font-semibold px-8 py-3 rounded-xl text-sm"
                    >
                      Cerrar
                    </button>
                  </div>
                ) : (
                  /* Form */
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Nombre + Clínica */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-[#9a9080] mb-1.5 block">Tu nombre *</label>
                        <input
                          {...register('nombre', { required: 'Campo obligatorio' })}
                          placeholder="Ana García"
                          className={inputClass}
                        />
                        {errors.nombre && <p className={errorClass}>{errors.nombre.message}</p>}
                      </div>
                      <div>
                        <label className="text-xs text-[#9a9080] mb-1.5 block">Nombre de la clínica *</label>
                        <input
                          {...register('clinica', { required: 'Campo obligatorio' })}
                          placeholder="Clínica Estética Belleza"
                          className={inputClass}
                        />
                        {errors.clinica && <p className={errorClass}>{errors.clinica.message}</p>}
                      </div>
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label className="text-xs text-[#9a9080] mb-1.5 block">Teléfono (WhatsApp) *</label>
                      <input
                        {...register('telefono', {
                          required: 'Campo obligatorio',
                          pattern: {
                            value: /^[+\d\s()-]{9,15}$/,
                            message: 'Introduce un teléfono válido',
                          },
                        })}
                        placeholder="+34 600 000 000"
                        type="tel"
                        className={inputClass}
                      />
                      {errors.telefono && <p className={errorClass}>{errors.telefono.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs text-[#9a9080] mb-1.5 block">Email *</label>
                      <input
                        {...register('email', {
                          required: 'Campo obligatorio',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Introduce un email válido',
                          },
                        })}
                        placeholder="ana@clinicabelleza.es"
                        type="email"
                        className={inputClass}
                      />
                      {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                    </div>

                    {/* Ciudad + Leads */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-[#9a9080] mb-1.5 block">Ciudad *</label>
                        <input
                          {...register('ciudad', { required: 'Campo obligatorio' })}
                          placeholder="Madrid"
                          className={inputClass}
                        />
                        {errors.ciudad && <p className={errorClass}>{errors.ciudad.message}</p>}
                      </div>
                      <div>
                        <label className="text-xs text-[#9a9080] mb-1.5 block">Leads/mes por WhatsApp *</label>
                        <select
                          {...register('leads', { required: 'Campo obligatorio' })}
                          className={`${inputClass} appearance-none cursor-pointer`}
                          defaultValue=""
                        >
                          <option value="" disabled>Selecciona…</option>
                          <option value="menos-20">Menos de 20</option>
                          <option value="20-50">20 – 50</option>
                          <option value="50-100">50 – 100</option>
                          <option value="mas-100">Más de 100</option>
                        </select>
                        {errors.leads && <p className={errorClass}>{errors.leads.message}</p>}
                      </div>
                    </div>

                    {/* Privacy note */}
                    <p className="text-[#6b6258] text-xs leading-relaxed">
                      Al enviar aceptas nuestra{' '}
                      <a href="/privacidad" className="underline hover:text-[#9a9080]" target="_blank">
                        Política de Privacidad
                      </a>
                      . Tus datos solo se usarán para contactarte sobre la demo.
                    </p>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#c9a96e] hover:bg-[#dbbe8a] disabled:opacity-60 text-[#0f0e0d] font-semibold py-4 rounded-xl text-base transition-all duration-200 mt-2"
                    >
                      {submitting ? 'Enviando…' : 'Solicitar demo gratuita →'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
