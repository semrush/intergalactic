import { createIntl, createIntlCache, IntlShape } from '@formatjs/intl';
import { normalizeLocale } from './locale';
import type { localizedMessages as localizedMessagesTypeBase } from './translations/view/__intergalactic-dynamic-locales';

export type Intl = IntlShape<typeof localizedMessagesTypeBase['en']>;
const messagesCache = createIntlCache();
const intlCache: { [locale: string]: ReturnType<typeof createIntl> } = {};
export const getIntl = (
  locale: string,
  translations: { [messageId: string]: string },
  availableLocales: { [localeId: string]: any },
) => {
  locale = normalizeLocale(locale, availableLocales) ?? 'en';
  intlCache[locale] = createIntl(
    {
      locale: locale,
      defaultLocale: 'en',
      messages: translations || {},
    },
    messagesCache,
  );
  return intlCache[locale] as Intl;
};
