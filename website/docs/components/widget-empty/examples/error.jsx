import React, { useState } from 'react';
import Select from '@semcore/ui/select';
import { Box } from '@semcore/ui/flex-box';
import { I18nProvider } from '@semcore/ui/utils/lib/enhances/WithI18n';
import { Error } from '@semcore/ui/widget-empty';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import Button from '@semcore/ui/button';
import Link from '@semcore/ui/link';
import Divider from '@semcore/ui/divider';

const options = ['de', 'en', 'es', 'fr', 'it', 'ja', 'pt', 'ru', 'zh', 'ko', 'vi'].map((o) => ({
  value: o,
  children: o,
}));

export default () => {
  const [lang, setLang] = useState('en');

  return (
    <div>
      Select lang: <Select options={options} value={lang} onChange={setLang} />
      <I18nProvider value={lang}>
        <Card my={5}>
          <Text size={300} bold>
            Known error
          </Text>
          <Divider orientation="horizontal" m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <Error>
            <Box mt={4}>
              <Button>Reload page</Button>
            </Box>
          </Error>
        </Card>
        <Card my={5}>
          <Text size={300} bold>
            Don't known error
          </Text>
          <Divider orientation="horizontal" m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <Error
            description={
              <>
                Please try again later. If the problem persists, contact us at{' '}
                <Link href="mailto:mail@semrush.com">mail@semrush.com</Link>
              </>
            }
          >
            <Box mt={4}>
              <Button>
                <Button.Text>Reload page</Button.Text>
              </Button>
            </Box>
          </Error>
        </Card>
      </I18nProvider>
    </div>
  );
};
