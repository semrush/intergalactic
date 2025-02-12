import React from 'react';
import Select from '@semcore/select';
import { I18nProvider } from '@semcore/core/lib/utils/enhances/WithI18n';
import { NoData } from '@semcore/widget-empty';
import Card from '@semcore/card';
import Button from '@semcore/button';
import { Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

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
      <Text size={200} tag='label' mr={2} htmlFor='select-language'>
        Language
      </Text>
      <Select id='select-language' options={options} value={lang} onChange={setLang} />
      <I18nProvider value={lang}>
        <Card mt={4}>
          <Card.Header>
            <Card.Title>Line chart</Card.Title>
          </Card.Header>
          <Card.Body>
            <NoData type='line-chart' />
          </Card.Body>
        </Card>
        <Card mt={4}>
          <Card.Header>
            <Card.Title>Nothing found</Card.Title>
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
