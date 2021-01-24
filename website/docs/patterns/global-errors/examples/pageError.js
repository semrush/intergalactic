import React, { useState } from 'react';
import Select from '@semcore/select';
import { I18nProvider } from '@semcore/utils/lib/enhances/WithI18n';
import {
  AccessDenied,
  Maintenance,
  PageError,
  PageNotFound,
  ProjectNotFound,
} from '@semcore/errors';

const options = ['de', 'en', 'es', 'fr', 'it', 'ja', 'pt', 'ru', 'zh'].map((o) => ({
  value: o,
  children: o,
}));

export default () => {
  const [lang, setLang] = useState('en');

  return (
    <div>
      Select lang: <Select options={options} value={lang} onChange={(value) => setLang(value)} />
      <I18nProvider value={lang}>
        <AccessDenied />
        <Maintenance toolName={'Ui-kit'} />
        <PageError />
        <PageNotFound />
        <ProjectNotFound />
      </I18nProvider>
    </div>
  );
};
