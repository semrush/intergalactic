import React, { useState } from 'react';
import { Box } from '@semcore/ui/flex-box';
import Select from '@semcore/ui/select';
import { I18nProvider } from '@semcore/ui/utils/lib/enhances/WithI18n';
import { NoData } from '@semcore/ui/widget-empty';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import Button from '@semcore/ui/button';
import Divider from '@semcore/ui/divider';

const options = ['de', 'en', 'es', 'fr', 'it', 'ja', 'pt', 'ru', 'zh', 'ko', 'vi', 'pl'].map(
  (o) => ({
    value: o,
    children: o,
  }),
);

export default () => {
  const [lang, setLang] = useState('en');

  return (
    <div>
      Select lang: <Select options={options} value={lang} onChange={setLang} />
      <I18nProvider value={lang}>
        <Card my={5}>
          <Text size={300} bold>
            Nothing found
          </Text>
          <Divider orientation="horizontal" m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type="nothing-found" description="Try changing your filters.">
            <Box mt={4}>
              <Button use="secondary">Clear filters</Button>
            </Box>
          </NoData>
        </Card>
      </I18nProvider>
    </div>
  );
};
