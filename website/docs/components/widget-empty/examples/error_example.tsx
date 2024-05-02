import React from 'react';
import Select from 'intergalactic/select';
import { Box } from 'intergalactic/flex-box';
import { I18nProvider } from 'intergalactic/utils/lib/enhances/WithI18n';
import { Error } from 'intergalactic/widget-empty';
import Card from 'intergalactic/card';
import Button from 'intergalactic/button';
import ReloadM from 'intergalactic/icon/Reload/m';
import Link from 'intergalactic/link';

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
      Select language: <Select options={options} value={lang} onChange={setLang} />
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
          </Card.Body>
        </Card>
      </I18nProvider>
    </div>
  );
};

export default Demo;
