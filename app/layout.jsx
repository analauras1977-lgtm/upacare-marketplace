import './globals.css';
import SiteChrome from './components/SiteChrome';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://upacare-marketplace.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'UpaCare | Verified Nanny & Babysitting Marketplace in Miami',
    template: '%s | UpaCare',
  },
  description:
    'UpaCare connects Miami families with ID-verified, background-checked nannies and babysitters. Verification is included at no extra cost, pricing is transparent, and there is no mandatory monthly membership. Also available for hotels, events and corporate childcare.',
  keywords: [
    'nanny Miami',
    'babysitter Miami',
    'babysitting service Miami',
    'niñera Miami',
    'childcare marketplace',
    'background checked nanny',
    'corporate babysitting Miami',
    'UpaCare',
  ],
  authors: [{ name: 'UPA Entertainment' }],
  applicationName: 'UpaCare',
  category: 'Childcare services',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_US', 'he_IL'],
    url: siteUrl,
    siteName: 'UpaCare',
    title: 'UpaCare | Verified Nanny & Babysitting Marketplace in Miami',
    description:
      'Find ID-verified, background-checked nannies in Miami. Transparent hourly pricing, free verification, no forced monthly fees.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UpaCare | Verified Nanny & Babysitting Marketplace in Miami',
    description: 'Find ID-verified, background-checked nannies in Miami. Transparent pricing, no forced monthly fees.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: '/',
  },
};

// Sitewide structured data (Answer/AI Engine Optimization): a single
// LocalBusiness graph so AI assistants and search engines can extract who
// UpaCare is, where it operates, and how to reach it without crawling.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#organization`,
  name: 'UpaCare',
  legalName: 'UPA Entertainment',
  description:
    'UpaCare is a marketplace that connects families in Miami, Florida with ID-verified, background-checked nannies and babysitters. Verification is included free of charge for every caregiver. Families pay only when they book — there is no mandatory monthly membership. UpaCare also provides on-demand babysitting for hotels, corporate offices and events.',
  url: siteUrl,
  telephone: '+1-561-367-5662',
  email: 'info@upaentertainment.com',
  areaServed: { '@type': 'City', name: 'Miami', containedInPlace: { '@type': 'State', name: 'Florida' } },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3300 NE 191 St, Suite 1907',
    addressLocality: 'Aventura',
    addressRegion: 'FL',
    postalCode: '33180',
    addressCountry: 'US',
  },
  priceRange: '$$',
  knowsLanguage: ['en', 'es', 'he'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-upa-ink">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
