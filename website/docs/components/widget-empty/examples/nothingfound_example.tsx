import React from 'react';
import { Box } from 'intergalactic/flex-box';
import Select from 'intergalactic/select';
import { I18nProvider } from 'intergalactic/utils/lib/enhances/WithI18n';
import { NoData } from 'intergalactic/widget-empty';
import Card from 'intergalactic/card';
import Button from 'intergalactic/button';

const options = [
  'en',
  'de',
  'es',
  'fr',
  'it',
  'nl',
  'pl',
  'pt',
  'sv',
  'vi',
  'tr',
  'zh',
  'ja',
  'ko',
].map((o) => ({
  value: o,
  children: o,
}));

const Demo = () => {
  const [lang, setLang] = React.useState('en');

  return (
    <div>
      Select language: <Select options={options} value={lang} onChange={setLang} />
      <I18nProvider value={lang}>
        <Card mt={4}>
          <Card.Header>
            <Card.Title>
              Nothing found
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <NoData type='nothing-found'>
              <Box mt={4}>
                <Button use='secondary'>Clear filters</Button>
              </Box>
            </NoData>
          </Card.Body>
        </Card>
      </I18nProvider>
    </div>
  );
};

export default Demo;
