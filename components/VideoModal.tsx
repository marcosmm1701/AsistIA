'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Bloqueo de scroll del body mientras el modal está abierto.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // ESC para cerrar.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  // Cuando se cierra el modal, pausamos y rebobinamos el video — para que
  // no siga sonando en background y para que la próxima apertura empiece
  // desde el principio.
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Vídeo demo de Citalia"
              className="relative w-full max-w-4xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón cerrar (encima del video, fuera del contenedor) */}
              <button
                onClick={onClose}
                aria-label="Cerrar vídeo"
                className="absolute -top-12 right-0 text-[#9a9080] hover:text-[#f5f0e8] transition-colors flex items-center gap-2 text-sm group"
              >
                <span className="hidden sm:inline">Cerrar</span>
                <span className="w-8 h-8 rounded-full bg-[#2a2520] group-hover:bg-[#3a352e] flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              </button>

              {/* Video container con ratio 16:9 */}
              <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-[#2a2520]">
                <video
                  ref={videoRef}
                  src="/demo.mp4"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="w-full h-full"
                >
                  Tu navegador no soporta vídeo HTML5.
                </video>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
