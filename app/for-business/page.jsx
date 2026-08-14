import ForBusinessClient from './ForBusinessClient';

export const metadata = {
  title: 'For Business — Hotel, Event & Corporate Childcare in Miami',
  description:
    'On-demand babysitting for hotels, weddings, corporate offices and conferences in Miami. Every caregiver is ID-verified and background-checked, with simple monthly invoicing.',
  alternates: { canonical: '/for-business' },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Corporate and event childcare',
  provider: { '@type': 'Organization', name: 'UpaCare' },
  areaServed: { '@type': 'City', name: 'Miami' },
  description:
    'On-demand babysitting for hotels, weddings, corporate offices and conferences in Miami, staffed with ID-verified, background-checked caregivers and billed on a single monthly invoice.',
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <ForBusinessClient />
    </>
  );
}
