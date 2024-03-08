import React from 'react';
import { Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';
import Textarea from 'intergalactic/textarea';
import Counter from 'intergalactic/counter';
import { ScreenReaderOnly } from 'intergalactic/utils/lib/ScreenReaderOnly';

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
      <Text size={200} color='text-secondary' id='limited-text-field'>
        optional
      </Text>
    </Flex>
    <Textarea placeholder='Placeholder' />
  </Flex>
);

export default Demo;
