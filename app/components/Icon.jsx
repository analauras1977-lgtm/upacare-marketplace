// Lightweight inline-SVG icon set — no external icon dependency required.
// Usage: <Icon name="shield" className="w-5 h-5" />

const paths = {
  shield: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z"
    />
  ),
  shieldCheck: (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4" />
    </>
  ),
  idCard: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth={1.8} />
      <circle cx="8.5" cy="11" r="1.8" strokeWidth={1.8} />
      <path strokeLinecap="round" strokeWidth={1.8} d="M6 15.5c.7-1.3 1.9-2 2.5-2s1.8.7 2.5 2M13.5 9.5h4M13.5 12.5h4M13.5 15.5h2.5" />
    </>
  ),
  heartPulse: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M12 20s-7-4.3-9.5-8.8C.8 8 2.2 4.8 5.4 4.2c1.9-.4 3.7.5 4.6 2 .9-1.5 2.7-2.4 4.6-2 3.2.6 4.6 3.8 2.9 7-.5.9-1.1 1.8-1.9 2.7M3 12h3l1.5-3 2 5 1.5-2.5H15"
    />
  ),
  star: <path strokeLinejoin="round" strokeWidth={1.8} d="M12 3.5l2.6 5.6 6 .7-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.8l6-.7L12 3.5z" />,
  check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 12.5l4.5 4.5L19 7" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" strokeWidth={1.8} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 7.5V12l3 2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="8" width="18" height="11" rx="2" strokeWidth={1.8} />
      <path strokeLinecap="round" strokeWidth={1.8} d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" />
      <path strokeWidth={1.8} d="M3 13h18" />
    </>
  ),
  users: (
    <>
      <circle cx="8.5" cy="8" r="3" strokeWidth={1.8} />
      <path strokeLinecap="round" strokeWidth={1.8} d="M2.5 19c.6-3.3 3-5 6-5s5.4 1.7 6 5" />
      <circle cx="17" cy="8.5" r="2.4" strokeWidth={1.8} />
      <path strokeLinecap="round" strokeWidth={1.8} d="M15.7 14.2c2.4.4 4 1.9 4.5 4.8" />
    </>
  ),
  mapPin: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 21s-6.5-5.9-6.5-11A6.5 6.5 0 1118.5 10c0 5.1-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" strokeWidth={1.8} />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" strokeWidth={1.8} />
      <path strokeLinecap="round" strokeWidth={1.8} d="M3 10h18" />
      <circle cx="16.5" cy="14" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  chat: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M4 5h16v11H8l-4 4V5z"
    />
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" strokeWidth={1.8} />
      <path strokeLinecap="round" strokeWidth={1.8} d="M8 3v4M16 3v4M3.5 10h17" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="10" height="18" rx="1" strokeWidth={1.8} />
      <rect x="14" y="9" width="6" height="12" rx="1" strokeWidth={1.8} />
      <path strokeLinecap="round" strokeWidth={1.8} d="M7 7h1M10 7h1M7 11h1M10 11h1M7 15h1M10 15h1" />
    </>
  ),
  bolt: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" />,
};

export default function Icon({ name, className = 'w-5 h-5' }) {
  const path = paths[name];
  if (!path) return null;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      {path}
    </svg>
  );
}
