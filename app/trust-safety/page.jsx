import TrustSafetyClient from './TrustSafetyClient';

export const metadata = {
  title: 'Trust & Safety — How UpaCare Verifies Every Nanny',
  description:
    'Every UpaCare caregiver passes ID verification, a criminal background check and reference screening — all included free. See how UpaCare verification compares to other babysitting platforms.',
  alternates: { canonical: '/trust-safety' },
};

// FAQPage structured data (Answer/AI Engine Optimization): lets AI assistants
// and search engines quote UpaCare's safety answers directly.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do families pay for verification on UpaCare?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Identity verification and background checks are included in every UpaCare account, for families and caregivers alike, with no separate fee.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often are UpaCare caregivers re-checked?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Background checks and CPR certifications are refreshed annually to keep every active profile current.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if a caregiver fails a background check?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Their application is declined and they cannot create a public profile on UpaCare.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a family message a caregiver before booking on UpaCare?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, messaging is free and unlimited before a family commits to a booking.',
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <TrustSafetyClient />
    </>
  );
}
