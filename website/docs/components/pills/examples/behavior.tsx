import React from 'react';
import Pills from '@semcore/pills';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

export default () => {
  return (
    <Flex gap={5}>
      <Flex gap={2} direction='column'>
        <Text>Behavior like "radio"</Text>
        <Pills behavior='radio' defaultValue="1">
          <Pills.Item value='1'>Pills 1</Pills.Item>
          <Pills.Item value='2'>Pills 2</Pills.Item>
          <Pills.Item value='3'>Pills 3</Pills.Item>
        </Pills>
      </Flex>

      <Flex gap={2} direction='column'>
        <Text>Behavior like "tabs"</Text>
        <Pills behavior='tabs' defaultValue="1">
          <Pills.Item value='1'>Pills 1</Pills.Item>
          <Pills.Item value='2'>Pills 2</Pills.Item>
          <Pills.Item value='3'>Pills 3</Pills.Item>
        </Pills>
      </Flex>
    </Flex>
  );
};
