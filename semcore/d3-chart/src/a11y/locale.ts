export const normalizeLocale = (
  providedLocale = navigator.language,
  translations: { [locale: string]: {} } = {},
) => {
  let locale = providedLocale.toLowerCase();
  if (locale.includes('-') && !translations[locale]) {
    const [localeBase] = locale.split('-');
    if (translations[localeBase]) {
      locale = localeBase;
    }
  }
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
