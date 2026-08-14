import ForFamiliesClient from './ForFamiliesClient';

export const metadata = {
  title: 'For Families — Book Verified Nannies in Miami',
  description:
    'How UpaCare works for families: browse ID-verified nannies for free, no mandatory monthly membership, transparent pricing, and secure in-app payments.',
  alternates: { canonical: '/for-families' },
};

export default function Page() {
  return <ForFamiliesClient />;
}
