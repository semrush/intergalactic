import React from 'react';
// @ts-ignore
import { Context } from '@semcore/utils/lib/enhances/WithI18n';


function i18nAppLocaleEnhance() {
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
}

export default i18nAppLocaleEnhance;