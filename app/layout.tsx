import type { Metadata } from 'next'
import './globals.css'

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
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
      <body>{children}</body>
    </html>
  )
}
