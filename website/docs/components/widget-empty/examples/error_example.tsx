import React from 'react';
import Select from 'intergalactic/select';
import { Box } from 'intergalactic/flex-box';
import { I18nProvider } from 'intergalactic/utils/lib/enhances/WithI18n';
import { Error } from 'intergalactic/widget-empty';
import Card from 'intergalactic/card';
import { Text } from 'intergalactic/typography';
import Button from 'intergalactic/button';
import ReloadM from 'intergalactic/icon/Reload/m';
import Link from 'intergalactic/link';
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
  'nl',
  'vi',
  'pl',
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
            Known error
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <Error>
            <Box mt={4}>
              <Button addonLeft={ReloadM}>Reload page</Button>
            </Box>
          </Error>
        </Card>
        <Card my={5}>
          <Text size={300} bold>
            Don't known error
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <Error
            description={
              <>
                Please try again later. If the problem persists, contact us at{' '}
                <Link href='mailto:mail@semrush.com'>mail@semrush.com</Link>
              </>
            }
          >
            <Box mt={4}>
              <Button addonLeft={ReloadM}>
                <Button.Text>Reload page</Button.Text>
              </Button>
            </Box>
          </Error>
        </Card>
      </I18nProvider>
    </div>
  );
};

export default Demo;
