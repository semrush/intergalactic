---
title: Error message
tabs: Design('global-errors'), A11y('global-errors-a11y'), API('global-errors-api'), Example('global-errors-code'), Changelog('global-errors-changelog')
---

## Example of using templates

Both graphics and texts are already included in ready-to-use templates. The locale can be either got inside the component, or wrapped in an application `I18nProvider` from the `@react-semocre/utils` package, as in the example below.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import Select from '@semcore/ui/select';
import { I18nProvider } from '@semcore/ui/utils/enhances/WithI18n';
import {
  AccessDenied,
  Maintenance,
  PageError,
  PageNotFound,
  ProjectNotFound,
} from '@semcore/ui/errors';

const options = ['de', 'en', 'es', 'fr', 'it', 'ja', 'pt', 'ru', 'zh', 'ko', 'vi', 'pl', 'sv'].map(
  (o) => ({
    value: o,
    children: o,
  }),
);

const Demo = () => {
  const [lang, setLang] = useState('en');

  return (
    <div>
      Select lang: <Select options={options} value={lang} onChange={(value) => setLang(value)} />
      <I18nProvider value={lang}>
        <AccessDenied />
        <Maintenance toolName={'Ui-kit'} />
        <PageError />
        <PageNotFound />
        <ProjectNotFound />
      </I18nProvider>
    </div>
  );
};
</script>

:::

## Example of using a custom error

You can create any error page. In the `Error` package, you will find the `getIconPath` feature, which will allow you to get the latest versions of icons. The list of potential icons is described in the [API](/patterns/global-errors/global-errors-api).

::: sandbox

<script lang="tsx">
import React from 'react';
import Error, { getIconPath } from '@semcore/ui/errors';
import Button from '@semcore/ui/button';

const Demo = () => (
  <Error icon={getIconPath('confirmation')}>
    <Error.Title>Confirm you are a real person</Error.Title>
    <Error.Description wMax={510}>
      We need to make sure you're not a robot. Please complete the security check, and we'll be out
      of your way.
    </Error.Description>
    <Error.Controls>
      <Button size='l' use='primary' theme='info'>
        Submit
      </Button>
    </Error.Controls>
  </Error>
);
</script>

:::
