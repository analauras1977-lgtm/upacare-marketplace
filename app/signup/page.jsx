import SignupClient from './SignupClient';

export const metadata = {
  title: 'Sign Up',
  description: 'Create a free UpaCare account as a family or a nanny. Verification is included at no extra cost.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SignupClient />;
}
