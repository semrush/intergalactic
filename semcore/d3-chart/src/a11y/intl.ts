import { createIntl, createIntlCache, IntlShape } from '@formatjs/intl';
import { normalizeLocale } from './locale';
import type { localizedMessages as localizedMessagesTypeBase } from './translations/view/__intergalactic-dynamic-locales';

export type Intl = IntlShape<typeof localizedMessagesTypeBase['en']>;
const messagesCache = createIntlCache();
const intlCache: { [locale: string]: ReturnType<typeof createIntl> } = {};
export const getIntl = (locale: string, translations = {}) => {
  locale = normalizeLocale(locale, translations) ?? 'en';
  intlCache[locale] = createIntl(
    {
      locale: locale,
      defaultLocale: 'en',
      messages: translations[locale],
    },
    messagesCache,
  );
  return intlCache[locale] as Intl;
};
