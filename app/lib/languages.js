// Site UI languages. Flags are shown in the header switcher so visitors can
// change language directly without reading labels.
export const LANGUAGES = [
  { code: 'en', flag: '🇺🇸', label: 'EN', dir: 'ltr' },
  { code: 'es', flag: '🇪🇸', label: 'ES', dir: 'ltr' },
  { code: 'he', flag: '🇮🇱', label: 'HE', dir: 'rtl' },
];

export function dirFor(languageCode) {
  return LANGUAGES.find((l) => l.code === languageCode)?.dir || 'ltr';
}
