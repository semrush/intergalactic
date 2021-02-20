import { useContext } from 'react';
import { Context as ContextI18n } from './WithI18n';

export type LocaleKeys = 'de' | 'en' | 'es' | 'fr' | 'it' | 'ja' | 'ru' | 'zh' | 'pt' | 'ko' | 'vi';
export type DictionaryItem = { [key: string]: string };
export type Dictionary = { [K in LocaleKeys]: DictionaryItem };

const REGEX = {
  TEMPLATE_VAR: /{{(.*?)}}/g,
  HTML_BRACKETS: /[<>&"`]/g,
};

function mirror(a) {
  switch (a) {
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
}

export function interpolate(template: string, variables: {} = {}) {
  return template.replace(REGEX.TEMPLATE_VAR, (_, key) => {
    if (variables[key]) {
      return variables[key].replace(REGEX.HTML_BRACKETS, mirror);
    }
    return _;
  });
}

const getText = (dictionary: Dictionary, locale: LocaleKeys) => {
  return (key?: string, variables = {}) => {
    if (key) {
      return dictionary[locale] && dictionary[locale][key]
        ? interpolate(dictionary[locale][key], variables)
        : interpolate(dictionary['en'][key], variables);
    }
    // TODO: убрать эту возможность
    return dictionary[locale] || dictionary['en'];
  };
};

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

export default () => {
  return (props) => {
    const contextLocale = useContext(ContextI18n);
    const { i18n, locale } = props;

    return {
      getI18nText: getText(i18n, locale || contextLocale),
      ...props,
    };
  };
};
