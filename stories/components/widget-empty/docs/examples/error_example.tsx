import React from 'react';
import Select from '@semcore/select';
import { Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import { I18nProvider } from '@semcore/core/lib/utils/enhances/WithI18n';
import { Error } from '@semcore/widget-empty';
import Card from '@semcore/card';
import Button from '@semcore/button';
import ReloadM from '@semcore/icon/Reload/m';
import Link from '@semcore/link';

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
      <Text size={200} tag='label' htmlFor='select-lang-error' mr={2}>
        Language
      </Text>
      <Select id='select-lang-error' options={options} value={lang} onChange={setLang} />
      <I18nProvider value={lang}>
        <Card mt={4}>
          <Card.Header>
            <Card.Title>Known error</Card.Title>
          </Card.Header>
          <Card.Body>
            <Error>
              <Box mt={4}>
                <Button addonLeft={ReloadM}>Reload page</Button>
              </Box>
            </Error>
          </Card.Body>
        </Card>
        <Card mt={4}>
          <Card.Header>
            <Card.Title>Unknown error</Card.Title>
          </Card.Header>
          <Card.Body>
            <Error
              description={
                <>
                  Try again later. If the problem persists,{' '}
                  <Link href='https://www.semrush.com/kb/support/'>contact our support</Link>
                </>
              }
            >
              <Box mt={4}>
                <Button addonLeft={ReloadM}>
                  <Button.Text>Reload page</Button.Text>
                </Button>
              </Box>
            </Error>
          </Card.Body>
        </Card>
      </I18nProvider>
    </div>
  );
};

export default Demo;
