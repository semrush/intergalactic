export const REQUEST_FORM_COUNTRIES = {
  US: { name: 'United States', prefix: '+1', mask: '+1 (___) ___-____' },
  GB: { name: 'United Kingdom', prefix: '+44', mask: '+44 ____ ______' },
} as const;

export type RequestFormCountryKey = keyof typeof REQUEST_FORM_COUNTRIES;
