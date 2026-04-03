import { createIntl, createIntlCache } from '@formatjs/intl';
import React, { createContext } from 'react';

import { useAsyncI18nMessages } from './i18nEnhance';

export type LocaleKeys = string;
export type DictionaryItem = { [key: string]: string };
export type Dictionary = { [locale: string]: DictionaryItem | (() => Promise<DictionaryItem>) };
export const Context = createContext<LocaleKeys | undefined>(undefined);
const { Provider: I18nProvider, Consumer: I18nConsumer } = Context;
const messagesCache = createIntlCache();

const useI18n = (
  dictionary: Dictionary,
  locale: LocaleKeys = 'en',
  fallbackDictionary?: Dictionary,
) => {
  const lang = React.useContext(Context) ?? locale;
  const resolvedDictionary = useAsyncI18nMessages(dictionary, lang, fallbackDictionary);
  const intl = React.useMemo(
    () => createIntl({ locale: lang, messages: resolvedDictionary }, messagesCache),
    [resolvedDictionary, lang],
  );

  return React.useCallback(
    (messageId: string, variables?: { [key: string]: string | number | undefined }) => {
      return intl.formatMessage({ id: messageId ?? '' }, variables);
    },
    [intl],
  );
};

export { useI18n, I18nProvider, I18nConsumer };
