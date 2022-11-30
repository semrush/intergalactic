import en from './en.json';

export const localizedMessages = {
  de: () => import('./de.json'),
  en,
  es: () => import('./es.json'),
  fr: () => import('./fr.json'),
  it: () => import('./it.json'),
  ja: () => import('./ja.json'),
  ko: () => import('./ko.json'),
  pt: () => import('./pt.json'),
  ru: () => import('./ru.json'),
  tr: () => import('./tr.json'),
  vi: () => import('./vi.json'),
  zh: () => import('./zh.json'),
};
