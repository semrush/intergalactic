import React, { Component, createContext } from 'react';
import createHoc from '../createHoc';
import { useAsyncI18nMessages } from './i18nEnhance';
import { UnknownProperties } from '../../core-types/UnknownProperties';
import { createIntl, createIntlCache } from '@formatjs/intl';

export type LocaleKeys = string;
export type DictionaryItem = { [key: string]: string };
export type Dictionary = { [locale: string]: DictionaryItem | (() => Promise<DictionaryItem>) };
export const Context = createContext<LocaleKeys | undefined>(undefined);
const { Provider: I18nProvider, Consumer: I18nConsumer } = Context;
const messagesCache = createIntlCache();

function getText(dictionaries: Dictionary, locale: LocaleKeys) {
  return function (key: keyof DictionaryItem) {
    const dictionary = dictionaries[locale];
    return dictionary ? (dictionary as any)[key] : (dictionaries as any)['en'][key];
  };
}

/** @deprecated */
export interface IWithI18nInjectedProps extends WithI18nInjectedProps, UnknownProperties {}
export type WithI18nInjectedProps = {
  getText: WithI18n['getText'];
};

/** @deprecated */
export interface IWithI18nProps extends WithI18nProps, UnknownProperties {}
export type WithI18nProps = WithI18nInjectedProps & {
  locale?: LocaleKeys;

  children?(props: IWithI18nInjectedProps): React.ReactNode;
};

/**
 * @deprecated use `useI18n` instead
 */
class WithI18n extends Component<IWithI18nProps> {
  /* @ts-ignore */
  context: LocaleKeys;

  static contextType = Context;
  static defaultProps = {
    getText,
  };

  getText = (dictionary: Dictionary, selfLocale?: string): string => {
    const { locale, getText } = this.props;
    const contextLocale = this.context;
    return getText(dictionary, selfLocale || locale || contextLocale);
  };

  render() {
    const { children } = this.props as any;
    return children({
      getText: this.getText,
    });
  }
}

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

export default createHoc(WithI18n);
export { useI18n, I18nProvider, I18nConsumer };
