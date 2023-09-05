---
title: Example
fileSource: widget-empty
tabs: Widget empty state('index'), A11y('widget-empty-a11y'), API('widget-empty-api'), Example('widget-empty-code'), Changelog('widget-empty-changelog')
---

## NoData example

The template already includes the title. You only need to provide the data type and description.

::: tip
The locale can be passed directly to the component or wrap your application in `I18nProvider` from the `@react-semocre/utils` package, as shown in the example below.
:::

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import Select from '@semcore/ui/select';
import { I18nProvider } from '@semcore/ui/utils/enhances/WithI18n';
import { NoData } from '@semcore/ui/widget-empty';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import Divider from '@semcore/ui/divider';

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
      Select lang: <Select options={options} value={lang} onChange={setLang} />
      <I18nProvider value={lang}>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Line chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='line-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Area chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='area-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Stacked area chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='stacked-area-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Funnel chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='funnel-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Pie chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='pie-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Donut chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='donut-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Vertical bar chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='vertical-bar-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Horizontal bar chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='horizontal-bar-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Scatter plot chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='scatter-plot-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Venn chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='venn-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Radar chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='radar-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Lollipop chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='lollipop-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Choropleth map chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='choropleth-map-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Combined chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='combined-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Sankey chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='sankey-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Radial Tree chart
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='radial-tree-chart' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Table
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='table' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Text links etc
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='text-links-etc' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Other data
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='other-data' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Suggestions
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='suggestions' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Duplicates
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='duplicates' />
        </Card>
        <Card my={5} pt={4}>
          <Text size={300} bold>
            Tag cloud
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='tag-cloud' />
        </Card>
      </I18nProvider>
    </div>
  );
};
</script>

:::

## NothingFound example

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import { Box } from '@semcore/ui/flex-box';
import Select from '@semcore/ui/select';
import { I18nProvider } from '@semcore/ui/utils/enhances/WithI18n';
import { NoData } from '@semcore/ui/widget-empty';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import Button from '@semcore/ui/button';
import Divider from '@semcore/ui/divider';

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
      Select lang: <Select options={options} value={lang} onChange={setLang} />
      <I18nProvider value={lang}>
        <Card my={5}>
          <Text size={300} bold>
            Nothing found
          </Text>
          <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
          <NoData type='nothing-found' description='Try changing your filters.'>
            <Box mt={4}>
              <Button use='secondary'>Clear filters</Button>
            </Box>
          </NoData>
        </Card>
      </I18nProvider>
    </div>
  );
};
</script>

:::

## Error example

The template already includes the `title` and the `icon`. You only need to provide the `description` and additional elements if necessary.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import Select from '@semcore/ui/select';
import { Box } from '@semcore/ui/flex-box';
import { I18nProvider } from '@semcore/ui/utils/enhances/WithI18n';
import { Error } from '@semcore/ui/widget-empty';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import Button from '@semcore/ui/button';
import ReloadM from '@semcore/ui/icon/Reload/m';
import Link from '@semcore/ui/link';
import Divider from '@semcore/ui/divider';

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
</script>

:::

## Custom examples

You can create custom messages, such as the "[Set up your tool](/components/widget-empty/#set_up_your_product)" message.

To get the link to the [illustration](/style/illustration/), use the function `getIconPath` from the package.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import WidgetEmpty, { getIconPath } from '@semcore/ui/widget-empty';
import Divider from '@semcore/ui/divider';

const Demo = () => {
  return (
    <div>
      <Card my={5}>
        <Text size={300} bold>
          [Name Tool]
        </Text>
        <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
        <WidgetEmpty icon={getIconPath('combined-chart')}>
          <WidgetEmpty.Title>Set up your [Name Tool]</WidgetEmpty.Title>
          <WidgetEmpty.Description>
            [Name Tool] allows you to get daily updates on positions in Google’s top 100 organic and
            paid search results.
          </WidgetEmpty.Description>
          <Box mt={4}>
            <Button theme='success' use='primary'>
              Set up [Name Tool]
            </Button>
          </Box>
        </WidgetEmpty>
      </Card>
    </div>
  );
};
</script>

:::

You can find other examples of custom messages you can create with the WidgetEmpty component.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Text } from '@semcore/ui/typography';
import Card from '@semcore/ui/card';
import WidgetEmpty, { getIconPath } from '@semcore/ui/widget-empty';
import Divider from '@semcore/ui/divider';

const Demo = () => {
  return (
    <div>
      <Card my={5}>
        <Text size={300} bold>
          Congratulations
        </Text>
        <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
        <WidgetEmpty icon={getIconPath('congrats')}>
          <WidgetEmpty.Title>Wow! You are doing great!</WidgetEmpty.Title>
          <WidgetEmpty.Description>Nothing to fix here.</WidgetEmpty.Description>
        </WidgetEmpty>
      </Card>
      <Card my={5}>
        <Text size={300} bold>
          Good results
        </Text>
        <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
        <WidgetEmpty icon={getIconPath('good')}>
          <WidgetEmpty.Title>Good results</WidgetEmpty.Title>
          <WidgetEmpty.Description>Wow! You are doing great!</WidgetEmpty.Description>
        </WidgetEmpty>
      </Card>
      <Card my={5}>
        <Text size={300} bold>
          Next time
        </Text>
        <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
        <WidgetEmpty icon={getIconPath('nexttime')}>
          <WidgetEmpty.Title>Next time will be better</WidgetEmpty.Title>
          <WidgetEmpty.Description>Keep going to achieve good results.</WidgetEmpty.Description>
        </WidgetEmpty>
      </Card>
      <Card my={5}>
        <Text size={300} bold>
          Next time
        </Text>
        <Divider orientation='horizontal' m={'8px 0 12px -20px'} w={'calc(100% + 40px)'} />
        <WidgetEmpty icon={getIconPath('processing')}>
          <WidgetEmpty.Title>Processing</WidgetEmpty.Title>
          <WidgetEmpty.Description>
            Wait till the process will come to an end.
          </WidgetEmpty.Description>
        </WidgetEmpty>
      </Card>
    </div>
  );
};
</script>

:::
