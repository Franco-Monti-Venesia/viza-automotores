import './globals.css';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import WhatsappFloat from '@/components/whatsapp-float';
import ScrollEffects from '@/components/scroll-effects';
import { siteConfig } from '@/data/site';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Viza Automotores | Autos y camionetas en Cruz Alta, Córdoba',
    template: '%s | Viza Automotores',
  },
  description: siteConfig.description,
  applicationName: 'Viza Automotores',
  // Usamos directamente el PNG circular de alta calidad que ya está en public.
  // Se elimina la dependencia del icon.ico automático de src/app.
  icons: {
    icon: [{ url: '/images/brand/logo%20viza%20automotores3.png', type: 'image/png' }],
    shortcut: '/images/brand/logo%20viza%20automotores3.png',
    apple: '/images/brand/logo%20viza%20automotores3.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Viza Automotores',
    title: 'Viza Automotores | Encontrá el vehículo que estás buscando',
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: siteConfig.name,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address,
      addressLocality: 'Cruz Alta',
      addressRegion: 'Córdoba',
      addressCountry: 'AR',
    },
    telephone: `+${siteConfig.whatsapp}`,
    sameAs: [siteConfig.instagram],
  };

  return (
    <html lang="es-AR">
      <body>
        <ScrollEffects />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, '\\u003c') }} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <WhatsappFloat />
      </body>
    </html>
  );
}
