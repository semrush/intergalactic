import { Box } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import { I18nProvider } from '@semcore/ui/core/lib/utils/enhances/WithI18n';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import { NoData } from '@semcore/ui/widget-empty';
import React from 'react';

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
