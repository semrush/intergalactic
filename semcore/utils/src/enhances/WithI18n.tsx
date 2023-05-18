/* eslint-disable */
import React, { Component, createContext } from 'react';
import createHoc from '../createHoc';
import { interpolate, useAsyncI18nMessages } from './i18nEnhance';

export type LocaleKeys = string;
export type DictionaryItem = { [key: string]: string };
export type Dictionary = { [locale: string]: DictionaryItem | (() => Promise<DictionaryItem>) };
export const Context = createContext<LocaleKeys>(undefined);
const { Provider: I18nProvider, Consumer: I18nConsumer } = Context;

function getText(dictionaries: Dictionary, locale: LocaleKeys) {
  return function (key: keyof DictionaryItem) {
    const dictionary = dictionaries[locale];
    return dictionary ? dictionary[key] : dictionaries['en'][key];
  };
}

export interface IWithI18nInjectedProps {
  getText: WithI18n['getText'];
}

export interface IWithI18nProps extends IWithI18nInjectedProps {
  locale?: LocaleKeys;

  children?(props: IWithI18nInjectedProps): React.ReactNode;
}

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

  getText = (dictionary: Dictionary, selfLocale) => {
    const { locale, getText } = this.props;
    const contextLocale = this.context;
    return getText(dictionary, selfLocale || locale || contextLocale);
  };

  render() {
    const { children } = this.props;
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
  const lang = React.useContext(Context);
  const resolvedDictionary = useAsyncI18nMessages(dictionary, lang || locale, fallbackDictionary);
  return React.useCallback(
    (messageId: string, variables?: { [key: string]: string | number | undefined }) => {
      return interpolate(resolvedDictionary[messageId], variables);
    },
    [resolvedDictionary],
  );
};

export const i18nAppLocaleEnhance = () => {
  return {
    wrapperProps: (props) => {
      const { locale, ...other } = props;
      const contextLocale = React.useContext(Context);
      return {
        ...other,
        locale: locale ?? contextLocale,
      };
    },
  };
};

export default createHoc(WithI18n);
export { useI18n, I18nProvider, I18nConsumer };
