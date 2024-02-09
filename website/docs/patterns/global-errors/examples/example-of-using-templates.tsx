import React from 'react';
import Select from 'intergalactic/select';
import { I18nProvider } from 'intergalactic/utils/lib/enhances/WithI18n';
import {
  AccessDenied,
  Maintenance,
  PageError,
  PageNotFound,
  ProjectNotFound,
} from 'intergalactic/errors';

const options = [
  'de',
  'en',
  'es',
  'fr',
  'it',
  'ja',
  'pt',
  'ru',
  'zh',
  'ko',
  'vi',
  'pl',
  'nl',
  'sv',
].map((o) => ({
  value: o,
  children: o,
}));

const Demo = () => {
  const [lang, setLang] = React.useState('en');

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

export default Demo;
