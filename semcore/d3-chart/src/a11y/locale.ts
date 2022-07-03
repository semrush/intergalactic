export const normalizeLocale = (
  providedLocale: string,
  translations: { [locale: string]: {} } = {},
) => {
  const translationNames: { [lowercasedName: string]: string } = {};
  for (const locale in translations) {
    translationNames[locale.toLowerCase()] = locale;
  }
  providedLocale = providedLocale ?? globalThis?.navigator?.language ?? 'en';
  let locale = providedLocale.toLowerCase();
  if (locale.includes('-') && !translations[locale]) {
    const [localeBase] = locale.split('-');
    if (translations[localeBase]) {
      locale = localeBase;
    }
  }
  locale = translationNames[locale] ? translationNames[locale] : locale;
  if (!translations[locale]) {
    const availableLocales = Object.keys(translations).join(', ');
    // eslint-disable-next-line no-console
    console.error(
      `[Intergalactic @semcore/d3-charts a11y module]: No locale "${providedLocale}" available. Available locales: ${availableLocales}`,
    );
    return null;
  }
  return locale;
};
