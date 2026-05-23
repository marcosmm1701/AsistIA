import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

// next/font descarga las fuentes en BUILD TIME y las sirve desde nuestro
// propio dominio. Beneficios:
//  1. Sin requests a fonts.googleapis.com → Google ya no ve la IP de cada
//     visitante (cumplimiento RGPD, ver caso DSGVO Alemania 2022).
//  2. Sin third-party que pueda ser comprometida → CSP puede ser estricta.
//  3. Performance: una conexión DNS menos, fuentes self-hosted con
//     Cache-Control immutable.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://asistia.es'),
  title: {
    default: 'AsistIA — Agente IA para Clínicas de Medicina Estética',
    template: '%s | AsistIA',
  },
  description:
    'El primer agente de IA especializado en medicina estética que convierte leads de WhatsApp e Instagram en pacientes, 24/7. Primer mes gratis. Activo en 48h.',
  keywords: [
    'agente IA medicina estética',
    'chatbot clínica estética',
    'whatsapp bot medicina estética',
    'captación pacientes clínica',
    'automatización leads estética',
    'inteligencia artificial clínica',
  ],
  authors: [{ name: 'AsistIA', url: 'https://asistia.es' }],
  creator: 'AsistIA',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://asistia.es',
    siteName: 'AsistIA',
    title: 'AsistIA — Tu clínica vende mientras tú duermes',
    description:
      'Agente IA especializado en medicina estética. Convierte leads de WhatsApp e Instagram en pacientes a cualquier hora. Primer mes gratis.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AsistIA — Agente IA para Medicina Estética',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AsistIA — Tu clínica vende mientras tú duermes',
    description:
      'Agente IA especializado en medicina estética. Convierte leads de WhatsApp en pacientes 24/7.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  // Bloquea formatos legacy de detección de número de teléfono en iOS Safari
  // que pueden reescribir contenido en runtime.
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        {/* JSON-LD Schema.org. Contenido 100% estático y controlado por el
            código fuente: no hay user-input que pueda escapar a este bloque,
            por lo que dangerouslySetInnerHTML es seguro aquí. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'AsistIA',
              applicationCategory: 'BusinessApplication',
              description:
                'Agente de IA conversacional especializado en medicina estética. Atiende leads por WhatsApp e Instagram 24/7.',
              offers: {
                '@type': 'Offer',
                price: '249',
                priceCurrency: 'EUR',
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  billingDuration: 'P1M',
                },
              },
              provider: {
                '@type': 'Organization',
                name: 'AsistIA',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Madrid',
                  addressCountry: 'ES',
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'customer service',
                  email: 'hola@asistia.es',
                  availableLanguage: 'Spanish',
                },
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
