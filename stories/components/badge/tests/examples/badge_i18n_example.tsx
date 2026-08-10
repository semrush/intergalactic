import Badge from '@semcore/ui/badge';
import { Box, Flex } from '@semcore/ui/base-components';
import { I18nProvider } from '@semcore/ui/core/lib/utils/enhances/WithI18n';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
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
      <Box mb={4}>
        <Text size={200} tag='label' htmlFor='select-lang-badge' mr={2}>
          Language
        </Text>
        <Select id='select-lang-badge' options={options} value={lang} onChange={setLang} />
      </Box>

      <I18nProvider value={lang}>
        <Box>
          <Text mb={2}>Current locale: {lang}</Text>
          <Flex gap={2}>
            <Badge type='admin' />
            <Badge type='alpha' />
            <Badge type='beta' />
            <Badge type='new' />
            <Badge type='soon' />
          </Flex>
          <Flex gap={2} mt={2} p={4} bg='bg-primary-invert'>
            <Badge type='admin' theme='invert' />
            <Badge type='alpha' theme='invert' />
            <Badge type='beta' theme='invert' />
            <Badge type='new' theme='invert' />
            <Badge type='soon' theme='invert' />
            <Badge type='unavailable' theme='invert' />
          </Flex>
          <Flex gap={2} mt={2} p={4} alignItems='flex-start'>
            <Badge type='admin' theme='light' />
            <Badge type='alpha' theme='light' />
            <Badge type='beta' theme='light' />
            <Badge type='new' theme='light' />
            <Badge type='soon' theme='light' />
            <Badge type='unavailable' theme='light' />
          </Flex>
        </Box>
      </I18nProvider>
    </div>
  );
};

export default Demo;
