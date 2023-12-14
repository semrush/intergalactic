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
