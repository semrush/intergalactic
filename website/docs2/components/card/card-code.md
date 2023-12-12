---
title: Card
tabs: Design('card'), A11y('card-a11y'), API('card-api'), Example('card-code'), Changelog('card-changelog')
---
## Basic example

::: sandbox

<script lang="tsx">
import React from 'react';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import SettingsM from '@semcore/ui/icon/Settings/m';

const tooltipContent = `Hey! Don't forget to place some useful information here.`;

const Demo = () => (
  <Card>
    <Card.Header>
      <Card.Title hint={tooltipContent} tag='h4' inline my={0}>
        Card Title
      </Card.Title>
      <SettingsM
        style={{ float: 'right' }}
        mt={1}
        color='icon-secondary-neutral'
        interactive
        aria-label='Open settings'
      />
      <Card.Description my={0}>This is a description with additional information or insights.</Card.Description>
    </Card.Header>
    <Card.Body>
      <Text size={200}>Your awesome card content is placed here.</Text>
    </Card.Body>
  </Card>
);
</script>

:::

## Complex example

::: sandbox

<script lang="tsx">
import React from 'react';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';
import Close from '@semcore/ui/icon/Close/m';
import Select from '@semcore/ui/select';
import { LinkTrigger } from '@semcore/ui/base-trigger';

const tooltipContent = `Hey! Don't forget to place some useful information here.`;
const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Label ${index}`,
    children: `Option ${index}`,
  }));

const Demo = () => (
  <Card>
    <Card.Header>
      <Flex alignItems='center' justifyContent='space-between'>
        <Flex alignItems='center' tag='h4'>
          <Card.Title hint={tooltipContent}>Card Title</Card.Title>
        </Flex>
        <Flex alignItems='center'>
          <Text size={200} color='text-secondary' mr={2}>
            Optional info about data
          </Text>
          <Close color='icon-secondary-neutral' ml='auto' interactive aria-label='Close card' />
        </Flex>
      </Flex>
      <Card.Description tag='div'>
        <Select tag={LinkTrigger} options={options} placeholder='Select' mr={4} />
        This is an optional additional information or insights.
      </Card.Description>
    </Card.Header>
    <Card.Body>
      <Text size={200}>Your awesome card content is placed here.</Text>
    </Card.Body>
  </Card>
);
</script>

:::

<!-- ## Card layout for tables

::: sandbox

<script lang="tsx">
import React from 'react';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import SettingsM from '@semcore/ui/icon/Settings/m';
import DataTable from '@semcore/ui/data-table';

const tooltipContent = `Hey! Don't forget to place some useful information here.`;
const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];

const Demo = () => (
  <Card>
    <Card.Header>
      <Card.Title hint={tooltipContent} tag='h4' inline my={0}>
        Card Title
      </Card.Title>
      <SettingsM
        style={{ float: 'right' }}
        mt={1}
        color='icon-secondary-neutral'
        interactive
        aria-label='Open settings'
      />
      <Card.Description my={0}>This is a description with additional information or insights.</Card.Description>
    </Card.Header>
    <Card.Body p={'0 0 20px 0'}>
      <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
    </Card.Body>
  </Card>
);
</script>

::: -->

## Truncating text with ellipsis

::: sandbox

<script lang="tsx">
import React from 'react';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import Ellipsis from '@semcore/ui/ellipsis';
import { Flex } from '@semcore/ui/flex-box';

const tooltipContent = `Hey! Don't forget to place some useful information here.`;

const Demo = () => (
  <Card w={'50%'}>
    <Card.Header>
      <Flex alignItems='center' tag='h4'>
        <Card.Title tag={Ellipsis} hint={tooltipContent}>
          Long title which should show ellipsis when there isn't enough space.
        </Card.Title>
      </Flex>
      <Card.Description tag={Ellipsis}>
        Very long description which should show ellipsis when there isn't enough space.
      </Card.Description>
    </Card.Header>
    <Card.Body tag={Ellipsis}>
      <Text size={200}>
        Long body text which should show ellipsis when there isn't enough space.
      </Text>
    </Card.Body>
  </Card>
);
</script>

:::
