import React from 'react';
import Pills from 'intergalactic/pills';
import { Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';

const Demo = () => {
  return (
    <Flex gap={5}>
      <Flex gap={2} direction='column'>
        <Text size={200}>Behavior like "radio" (auto)</Text>
        <Pills behavior='auto' defaultValue='1'>
          <Pills.Item value='1'>Pill 1</Pills.Item>
          <Pills.Item value='2'>Pill 2</Pills.Item>
          <Pills.Item value='3'>Pill 3</Pills.Item>
        </Pills>
      </Flex>

      <Flex gap={2} direction='column'>
        <Text size={200}>Behavior like "tabs" (manual)</Text>
        <Pills behavior='manual' defaultValue='1'>
          <Pills.Item value='1'>Pill 1</Pills.Item>
          <Pills.Item value='2'>Pill 2</Pills.Item>
          <Pills.Item value='3'>Pill 3</Pills.Item>
        </Pills>
      </Flex>
    </Flex>
  );
};

export default Demo;
