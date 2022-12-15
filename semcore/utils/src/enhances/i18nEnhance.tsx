import React from 'react';
import { Context as ContextI18n, LocaleKeys } from './WithI18n';

const interpolationRegex = /{{(.*?)}}/g;

const escapeHtml = (html: string) =>
  html
    .split('')
    .map((char) => {
      switch (char) {
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '&':
          return '&amp;';
        case '"':
          return '&quot;';
        case '`':
          return '&#x60';
      }
      return char;
    })
    .join('');

export function interpolate(template: string, variables: {} = {}) {
  return template.replace(interpolationRegex, (_, key) => {
    if (variables[key]) {
      return escapeHtml(variables[key]);
    }
    return _;
  });
}

export interface IWithI18nEnhanceProps {
  /* Function for getting the required field from the translation dictionary */
  getI18nText?: (key?: string, variables?: {}) => any;
  /* Object with translations */
  i18n?: {
    [key: string]: string;
  };
  /* Locale for translations */
  locale?: LocaleKeys;
}

type Messages = { [messageId: string]: string };
type MessagesContainer = { [locale: string]: Messages | (() => Promise<Messages>) };
type MessagesStore = { [locale: string]: Messages };
export const useAsyncI18n = (container: MessagesContainer, locale: string) => {
  const initStore = React.useMemo(() => {
    const store: MessagesStore = {};
    for (const locale in container) {
      if (typeof container[locale] === 'object') {
        store[locale] = container[locale] as Messages;
      }
    }
    return store;
  }, [container]);
  const [store, setStore] = React.useState(initStore);
  const lastLoadedLocaleRef = React.useRef<string | null>(null);
  if (store[locale]) lastLoadedLocaleRef.current = locale;
  const fallbackMessages = React.useMemo(() => Object.values(store)[0], [store]);

  const loadingLocaleRef = React.useRef<string | null>(null);
  React.useEffect(() => {
    loadingLocaleRef.current = locale;
    const asyncMessages = container[locale];
    if (typeof asyncMessages === 'function') {
      asyncMessages()
        .then((module) => {
          if (loadingLocaleRef.current !== locale) return;
          let messages = module;
          if ('default' in module && typeof module.default === 'object') messages = module.default;
          setStore((store) => ({
            ...store,
            [locale]: messages,
          }));
        })
        // eslint-disable-next-line no-console
        .catch(console.error);
    }
  }, [container, locale]);

  return store[locale] ?? fallbackMessages;
};

export default () => {
  return (props) => {
    const contextLocale = React.useContext(ContextI18n);
    const { i18n, locale } = props;
    const resolvedLocale = locale || contextLocale;
    const resolvedMessages = useAsyncI18n(i18n, resolvedLocale);

    return {
      getI18nText: (messageId, variables) => interpolate(resolvedMessages[messageId], variables),
      ...props,
    };
  };
};
