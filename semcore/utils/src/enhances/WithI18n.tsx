/* eslint-disable */
import React, { Component, createContext, useContext, useMemo } from 'react';
import createHoc from '../createHoc';

export type LocaleKeys = 'de' | 'en' | 'es' | 'fr' | 'it' | 'ja' | 'ru' | 'zh' | 'pt';
export type DictionaryItem = { [key: string]: string };
export type Dictionary = { [K in LocaleKeys]: DictionaryItem };
export const Context = createContext<LocaleKeys>('en');
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

class WithI18n extends Component<IWithI18nProps> {
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

const useI18n = (dictionary: Dictionary, locale: LocaleKeys = 'en') => {
  const lang = useContext(Context) || locale;
  return useMemo(() => getText(dictionary, lang), [dictionary, lang]);
};

export default createHoc(WithI18n);
export { useI18n, I18nProvider, I18nConsumer };
