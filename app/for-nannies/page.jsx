import ForNanniesClient from './ForNanniesClient';

export const metadata = {
  title: 'For Nannies — Join UpaCare Miami',
  description:
    'Join UpaCare as a nanny or babysitter in Miami. Keep up to 90% of your rate, get a free background check, set your own schedule, and build your reputation with verified reviews.',
  alternates: { canonical: '/for-nannies' },
};

export default function Page() {
  return <ForNanniesClient />;
}
