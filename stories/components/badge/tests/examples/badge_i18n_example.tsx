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
          <Flex gap={2} mt={2} p='4px 0' style={{ background: '#000' }}>
            <Badge type='admin' inverted />
            <Badge type='alpha' inverted />
            <Badge type='beta' inverted />
            <Badge type='new' inverted />
            <Badge type='soon' inverted />
          </Flex>
        </Box>
      </I18nProvider>
    </div>
  );
};

export default Demo;
