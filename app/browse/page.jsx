import BrowseClient from './BrowseClient';

export const metadata = {
  title: 'Browse Verified Nannies in Miami',
  description:
    'Filter Miami nannies and babysitters by rating, hourly rate, CPR certification, languages spoken and same-day availability. Every listing is ID-verified and background-checked at no extra cost.',
  alternates: { canonical: '/browse' },
};

export default function Page() {
  return <BrowseClient />;
}
