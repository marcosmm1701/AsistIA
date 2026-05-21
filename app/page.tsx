'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Problems from '@/components/Problems'
import HowItWorks from '@/components/HowItWorks'
import Results from '@/components/Results'
import ForWho from '@/components/ForWho'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import CTAFinal from '@/components/CTAFinal'
import Footer from '@/components/Footer'
import DemoModal from '@/components/DemoModal'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main>
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <Hero onOpenModal={() => setModalOpen(true)} />
      <Problems />
      <HowItWorks />
      <Results />
      <ForWho />
      <Pricing onOpenModal={() => setModalOpen(true)} />
      <FAQ />
      <CTAFinal onOpenModal={() => setModalOpen(true)} />
      <Footer />
      <DemoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}
