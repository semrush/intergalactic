---
title: Example
tabs: Card('index'), A11y('card-a11y'), API('card-api'), Example('card-code'), Changelog('card-changelog')
---
## Basic example

An example of the default styles of cards with the title.

::: sandbox

<script lang="tsx">
import React from 'react';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import SettingsM from '@semcore/ui/icon/Settings/m';

const tooltipContent = `Hey! Don't forget to place some useful info here 😏`;

const Demo = () => (
  <Card>
    <Card.Header>
      <Card.Title hint={tooltipContent} tag='h4' inline my={0}>
        Card heading
      </Card.Title>
      <SettingsM
        style={{ float: 'right' }}
        mt={1}
        color='stone'
        interactive
        aria-label='Open settings'
      />
      <Card.Description>This is card additional information or insights.</Card.Description>
    </Card.Header>
    <Card.Body>
      <Text size={100}>Your awesome card content ✨</Text>
    </Card.Body>
  </Card>
);
</script>

:::

## More complicated example

Another example of a possible use

::: sandbox

<script lang="tsx">
import React from 'react';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';
import Close from '@semcore/ui/icon/Close/m';
import Select from '@semcore/ui/select';
import { LinkTrigger } from '@semcore/ui/base-trigger';

const tooltipContent = `Hey! Don't forget to place some useful info here 😏`;
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
          <Card.Title hint={tooltipContent}>Market Traffic vs Selected Domains Trends</Card.Title>
        </Flex>
        <Flex alignItems='center'>
          <Text size={200} color='#6C6E79' mr={2}>
            Info about data (optiona)
          </Text>
          <Close color='stone' ml='auto' interactive aria-label='Close card' />
        </Flex>
      </Flex>
      <Card.Description tag='div'>
        <Select tag={LinkTrigger} options={options} placeholder='Select' mr={4} />
        This is card additional information or insights.
      </Card.Description>
    </Card.Header>
    <Card.Body>
      <Text size={200}>Your awesome card content ✨</Text>
    </Card.Body>
  </Card>
);
</script>

:::

## Ellipsis

::: sandbox

<script lang="tsx">
import React from 'react';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import Ellipsis from '@semcore/ui/ellipsis';
import { Flex } from '@semcore/ui/flex-box';

const tooltipContent = `Hey! Don't forget to place some useful info here 😏`;

const Demo = () => (
  <Card w={'50%'}>
    <Card.Header>
      <Flex alignItems='center' tag='h4'>
        <Card.Title tag={Ellipsis} hint={tooltipContent}>
          Very long card title which should show ellipsis when there isn’t enough space
        </Card.Title>
      </Flex>
      <Card.Description tag={Ellipsis}>
        Very long description title which should show ellipsis when there isn’t enough space
      </Card.Description>
    </Card.Header>
    <Card.Body tag={Ellipsis}>
      <Text size={100}>
        Very long card body which should show ellipsis when there isn’t enough space
      </Text>
    </Card.Body>
  </Card>
);
</script>

:::
