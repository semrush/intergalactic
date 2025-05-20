import React from 'react';
import { LocaleKeys, useI18n } from './WithI18n';
import { UnknownProperties } from '../../core-types/UnknownProperties';

/** @deprecated */
export interface IWithI18nEnhanceProps extends WithI18nEnhanceProps, UnknownProperties {}
export type WithI18nEnhanceProps = {
  /* Function for getting the required field from the translation dictionary */
  getI18nText?: (key?: string, variables?: {}) => any;
  /* Object with translations */
  i18n?: {
    [locale: string]: {
      [key: string]: string;
    };
  };
  /* Locale for translations */
  locale?: LocaleKeys;
};

type Messages = { [messageId: string]: string };
type MessagesContainer = { [locale: string]: Messages | (() => Promise<Messages>) };
type MessagesStore = { [locale: string]: Messages };
export const useAsyncI18nMessages = (
  primaryContainer: MessagesContainer,
  locale: string,
  fallbackContainer?: MessagesContainer,
) => {
  const container = React.useMemo(() => {
    if (!fallbackContainer) return primaryContainer;
    if (!primaryContainer) return fallbackContainer;
    if (primaryContainer === fallbackContainer) return primaryContainer;
    const container: MessagesContainer = {};
    for (const locale in primaryContainer) {
      if (
        typeof primaryContainer[locale] === 'function' ||
        typeof fallbackContainer[locale] === 'function'
      ) {
        container[locale] = async () => {
          const [primary, fallback] = await Promise.all([
            primaryContainer[locale],
            fallbackContainer[locale],
          ]);
          return { ...primary, ...fallback };
        };
      } else {
        container[locale] = {
          ...(primaryContainer[locale] ?? {}),
          ...(fallbackContainer[locale] ?? {}),
        };
      }
    }
    return container;
  }, [primaryContainer, fallbackContainer]);
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

        .catch(console.error);
    }
  }, [container, locale]);

  return store[locale] ?? fallbackMessages;
};
export default (container?: MessagesContainer) => {
  return (props: any): { getI18nText: ReturnType<typeof useI18n> } => {
    const { i18n, locale } = props;
    const getI18nText = useI18n(i18n, locale, container);

    return { ...props, getI18nText };
  };
};
