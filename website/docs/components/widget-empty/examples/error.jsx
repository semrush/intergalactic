import React, { useState } from 'react';
import Select from '@semcore/select';
import { Box } from '@semcore/flex-box';
import { I18nProvider } from '@semcore/utils/lib/enhances/WithI18n';
import { Error } from '@semcore/widget-empty';
import Card from '@semcore/card';
import { Text } from '@semcore/typography';
import Button from '@semcore/button';
import Link from '@semcore/link';
import ReloadM from '@semcore/icon/Reload/m';
import Divider from '@semcore/divider';

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
              <Button>Try again</Button>
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
                Try to reload widget. If the problem persists, please contact us at{' '}
                <Link href="mailto:mail@semrush.com">mail@semrush.com</Link>
              </>
            }
          >
            <Box mt={4}>
              <Button>
                <Button.Addon tag={ReloadM} />
                <Button.Text>Reload</Button.Text>
              </Button>
            </Box>
          </Error>
        </Card>
      </I18nProvider>
    </div>
  );
};
