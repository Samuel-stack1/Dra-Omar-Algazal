import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export const metadata: Metadata = {
  title: {
    template: '%s | Dr. Omar Algazal',
    default: 'Dr. Omar Algazal - Dermatologista em São José do Rio Preto',
  },
  description: 'Médico Dermatologista Especialista em Psoríase, Dermatite Atópica, Hidradenite e Cosmiatria Avançada no Espaço Honos em São José do Rio Preto - SP.',
  keywords: ['Dermatologista', 'São José do Rio Preto', 'Psoríase', 'Dermatite Atópica', 'Estética', 'Botox', 'Preenchimento', 'Dr. Omar Algazal', 'Dermatologia Médica'],
  authors: [{ name: 'Dr. Omar Algazal' }],
  creator: 'Dr. Omar Algazal',
  publisher: 'Dr. Omar Algazal',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Dr. Omar Algazal - Dermatologista',
    description: 'Dermatologia Médica e Cosmiatria em São José do Rio Preto.',
    url: 'https://omardermatologista.com.br',
    siteName: 'Dr. Omar Algazal',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Omar Algazal - Dermatologista',
    description: 'Dermatologia Médica e Cosmiatria em São José do Rio Preto.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Physician",
              "name": "Dr. Omar Algazal",
              "image": "https://omardermatologista.com.br/clinica%20hoos.jpg",
              "@id": "https://omardermatologista.com.br",
              "url": "https://omardermatologista.com.br",
              "telephone": "+5517992285084",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. José Munia, 7301 - 4º andar, salas 401 e 402",
                "addressLocality": "São José do Rio Preto",
                "addressRegion": "SP",
                "postalCode": "15090-500",
                "addressCountry": "BR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -20.835,
                "longitude": -49.397
              },
              "sameAs": [
                "https://www.instagram.com/omaralgazal.dermato"
              ]
            })
          }}
        />
      </head>
      <body className="font-body bg-bg-main text-secondary-dark antialiased overflow-x-hidden selection:bg-accent selection:text-white">
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
