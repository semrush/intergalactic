---
title: Counter
tabs: Design('counter'), A11y('counter-a11y'), API('counter-api'), Example('counter-code'), Changelog('counter-changelog')
---

## Counter in filters
[FilterTrigger](/components/filter-trigger/filter-trigger) is normally used together with [Select](/components/select/select) or [Dropdown](/components/dropdown/dropdown). Go to [the guide](/components/filter-trigger/filter-trigger) for more information.

::: sandbox

<script lang="tsx">
import React from 'react';
import Counter, { AnimatedNumber } from '@semcore/ui/counter';
import { FilterTrigger } from '@semcore/ui/base-trigger';

const Demo = () => (
  <FilterTrigger>
    <FilterTrigger.Text>Link to website</FilterTrigger.Text>
    <FilterTrigger.Addon>
      <Counter theme='light-blue'>
        <AnimatedNumber value={500} delay={1000} formatValue={(x) => Math.round(x).toString()} />
      </Counter>
    </FilterTrigger.Addon>
  </FilterTrigger>
);
</script>

:::

## Counter in Button

::: tip
Don't forget to place counters inside the `Addon` to create correct margins.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import Counter from '@semcore/ui/counter';
import Button from '@semcore/ui/button';
import SettingsM from '@semcore/ui/icon/Settings/m';

const Demo = () => (
  <>
    <Button mr={4}>
      <Button.Addon>
        <SettingsM />
      </Button.Addon>
      <Button.Text>Manage columns</Button.Text>
      <Button.Addon>
        <Counter>23</Counter>
      </Button.Addon>
    </Button>
    <Button use='primary'>
      <Button.Addon>
        <SettingsM />
      </Button.Addon>
      <Button.Text>Manage columns</Button.Text>
      <Button.Addon>
        <Counter theme='white'>23</Counter>
      </Button.Addon>
    </Button>
  </>
);
</script>

:::

## Counter in forms

::: tip
As design guide recommends, the counter changes color to orange and then red when the limit is reached and exceeded, respectively. This rule isn’t implemented in the example.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import Textarea from '@semcore/ui/textarea';
import Counter from '@semcore/ui/counter';
import { ScreenReaderOnly } from '@semcore/ui/utils/lib/ScreenReaderOnly';

const Demo = () => (
  <Flex direction='column' w={350}>
    <Flex mb={2} justifyContent='space-between'>
      <Text size={200} tag='label' htmlFor='limited-text-field'>
        Label <ScreenReaderOnly>characters limit</ScreenReaderOnly>
        <Counter ml={1}>
          {0}
          <ScreenReaderOnly>characters</ScreenReaderOnly>
          <span aria-hidden='true'>/</span>
          <ScreenReaderOnly>of</ScreenReaderOnly>
          {150}
          <ScreenReaderOnly>maximum</ScreenReaderOnly>
        </Counter>
      </Text>
      <Text size={200} color='gray70' id='limited-text-field'>
        optional
      </Text>
    </Flex>
    <Textarea placeholder='Placeholder' />
  </Flex>
);
</script>

:::

## Counter and typography

The text counters shall be implemented using [Typography](/style/typography/typography) without using the `Counter` component.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Text } from '@semcore/ui/typography';

const Demo = () => (
  <>
    <Text size={300}>
      Lorem ipsum <Text color='gray60'>12,457</Text>
    </Text>
    <br />
    <Text size={300}>
      Dolor sit amet: <Text color='gray60'>149</Text>
    </Text>
  </>
);
</script>

:::

## Counter in Pills

As you can see, there are text counters inside [Pills](/components/pills/pills). Implement them via [Typography](/style/typography/typography), as well, without using the `Counter` component.

::: sandbox

<script lang="tsx">
import React from 'react';
import Pills from '@semcore/ui/pills';
import { Text } from '@semcore/ui/typography';

const Demo = () => (
  <Pills defaultValue='all'>
    <Pills.Item value='all'>
      <Pills.Item.Text>All</Pills.Item.Text>
      <Pills.Item.Addon>
        <Text color='gray60'>1,259</Text>
      </Pills.Item.Addon>
    </Pills.Item>
    <Pills.Item value='follow'>
      <Pills.Item.Text>Follow</Pills.Item.Text>
      <Pills.Item.Addon>
        <Text color='gray60'>557</Text>
      </Pills.Item.Addon>
    </Pills.Item>
    <Pills.Item value='not-follow'>
      <Pills.Item.Text>Not Follow</Pills.Item.Text>
      <Pills.Item.Addon>
        <Text color='gray60'>736</Text>
      </Pills.Item.Addon>
    </Pills.Item>
  </Pills>
);
</script>

:::

## Counter in limits

Implement the text counters in limits using [Typography](/style/typography/typography) without using the `Counter` component.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';
import ProgressBar from '@semcore/ui/progress-bar';
import WarningM from '@semcore/ui/icon/Warning/m';

const Demo = () => (
  <Flex direction='column' w={350}>
    <Flex mb={1} justifyContent='space-between'>
      <Text size={100}>SEO Ideas Units</Text>
      <Flex alignItems='center'>
        <WarningM color='orange' />
        <Text size={100} ml={1} bold>
          10<Text color='gray60'>/10</Text>
        </Text>
      </Flex>
    </Flex>
    <ProgressBar theme='orange' size='s' />
  </Flex>
);
</script>

:::

## Counter in Dot

The `Dot` component can also contain a text counter. For more information, see the [Dot](/components/dot/dot).

::: sandbox

<script lang="tsx">
import React from 'react';
import Button from '@semcore/ui/button';
import NotificationM from '@semcore/ui/icon/Notification/m';
import Dot from '@semcore/ui/dot';
import { AnimatedNumber } from '@semcore/ui/counter';

const Demo = () => (
  <Button aria-label='Open notifications'>
    <Button.Addon>
      <NotificationM />
      <Dot up aria-labelledby='notifications-counter'>
        <AnimatedNumber
          id='notifications-counter'
          aria-label='You have 18 unread notifications'
          initValue={10}
          value={18}
          duration={1000}
          delay={500}
          formatValue={(x) => Math.round(x).toString()}
        />
      </Dot>
    </Button.Addon>
  </Button>
);
</script>

:::
