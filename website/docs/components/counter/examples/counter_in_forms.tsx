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
        Project description
        <Counter ml={1}>
          {0}
          <span aria-hidden='true'>/</span>
          <ScreenReaderOnly>of</ScreenReaderOnly>
          {150}
          <ScreenReaderOnly>allowed characters</ScreenReaderOnly>
        </Counter>
      </Text>
      <Text size={200} color='text-secondary'>
        optional
      </Text>
    </Flex>
    <Textarea
      placeholder='The goal of your project, required resources, and so on'
      id='limited-text-field'
    />
  </Flex>
);

export default Demo;
