import React from 'react';
import { Box } from 'intergalactic/flex-box';
import Select from 'intergalactic/select';
import { I18nProvider } from 'intergalactic/utils/lib/enhances/WithI18n';
import { NoData } from 'intergalactic/widget-empty';
import Card from 'intergalactic/card';
import { Text } from 'intergalactic/typography';
import Button from 'intergalactic/button';
import Divider from 'intergalactic/divider';

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
      Select lang: <Select options={options} value={lang} onChange={setLang} />
      <I18nProvider value={lang}>
        <Card my={5}>
          <Text size={300} bold>
            Nothing found
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='nothing-found' description='Try changing your filters.'>
            <Box mt={4}>
              <Button use='secondary'>Clear filters</Button>
            </Box>
          </NoData>
        </Card>
      </I18nProvider>
    </div>
  );
};

export default Demo;
