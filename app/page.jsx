import HomeClient from './HomeClient';

export const metadata = {
  title: 'Verified Nanny & Babysitting Marketplace in Miami',
  description:
    'Browse ID-verified, background-checked nannies in Miami. Verification is included at no extra cost, pricing is transparent, and there is no mandatory monthly membership.',
  alternates: { canonical: '/' },
};

export default function Page() {
  return <HomeClient />;
}
