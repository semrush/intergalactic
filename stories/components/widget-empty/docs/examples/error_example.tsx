import ReloadM from '@semcore/icon/Reload/m';
import { Box } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import { I18nProvider } from '@semcore/ui/core/lib/utils/enhances/WithI18n';
import Link from '@semcore/ui/link';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import { Error } from '@semcore/ui/widget-empty';
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
              description={(
                <>
                  Try again later. If the problem persists,
                  {' '}
                  <Link href='https://www.semrush.com/company/contacts/'>contact our support team</Link>
                  .
                </>
              )}
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
