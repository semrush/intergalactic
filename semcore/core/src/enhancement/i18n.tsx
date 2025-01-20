import React from 'react';
import { Context } from '../utils/enhances/WithI18n';

function i18nAppLocaleEnhance() {
  return {
    wrapperProps: (props: any) => {
      const { locale, ...other } = props;
      const contextLocale = React.useContext(Context);
      if (!locale && !contextLocale) return props;
      return {
        ...other,
        locale: locale ?? contextLocale,
      };
    },
  };
}

export default i18nAppLocaleEnhance;
