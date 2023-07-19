import React from 'react';
// @ts-ignore
import { Context } from '@semcore/utils/lib/enhances/WithI18n';

function i18nAppLocaleEnhance() {
  return {
    wrapperProps: (props: any) => {
      const { locale: componentLocale, ...other } = props;
      const contextLocale = React.useContext(Context);
      const locale = componentLocale ?? contextLocale;
      if (locale) {
        return {
          ...other,
          locale,
        };
      }
      return other;
    },
  };
}

export default i18nAppLocaleEnhance;
