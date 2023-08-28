---
title: Example
fileSource: pills
tabs: Pills('pills'), A11y('pills-a11y'), API('pills-api'), Example('pills-code'), Changelog('pills-changelog')
---

## Basic example

::: sandbox

<script lang="tsx">
import React from 'react';
import Pills from '@semcore/ui/pills';
import ThumbUpM from '@semcore/ui/icon/ThumbUp/m';
import ThumbDownM from '@semcore/ui/icon/ThumbDown/m';

export default () => {
  const [choice, setChoice] = React.useState(null);

  return (
    <Pills value={choice} onChange={setChoice}>
      <Pills.Item value={'like'}>
        <Pills.Item.Addon tag={ThumbUpM} />
        <Pills.Item.Text>Like</Pills.Item.Text>
      </Pills.Item>
      <Pills.Item value={null}>Don't care</Pills.Item>
      <Pills.Item value={'dislike'}>
        <Pills.Item.Addon tag={ThumbDownM} />
        <Pills.Item.Text>Dislike</Pills.Item.Text>
      </Pills.Item>
    </Pills>
  );
};
</script>

:::

## Behavior arrows

Switch to Pills using the `Tab` key and attempt switching with the arrow keys.

::: sandbox

<script lang="tsx">
import React from 'react';
import Pills from '@semcore/ui/pills';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

export default () => {
  return (
    <Flex gap={5}>
      <Flex gap={2} direction='column'>
        <Text size={200}>Behavior like "radio"</Text>
        <Pills behavior='radio' defaultValue='1'>
          <Pills.Item value='1'>Pill 1</Pills.Item>
          <Pills.Item value='2'>Pill 2</Pills.Item>
          <Pills.Item value='3'>Pill 3</Pills.Item>
        </Pills>
      </Flex>

      <Flex gap={2} direction='column'>
        <Text size={200}>Behavior like "tabs"</Text>
        <Pills behavior='tabs' defaultValue='1'>
          <Pills.Item value='1'>Pill 1</Pills.Item>
          <Pills.Item value='2'>Pill 2</Pills.Item>
          <Pills.Item value='3'>Pill 3</Pills.Item>
        </Pills>
      </Flex>
    </Flex>
  );
};
</script>

:::
