import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = () => (
  <Flex gap={1} direction='column'>
    <Text size={300} tag='p' mb={2} mt={0}>
      Example sentence with a
      {' '}
      <Text color='text-success'>colored text</Text>
      .
    </Text>
    <Text size={300} tag='p' mb={2} mt={0}>
      Example sentence with a
      {' '}
      <Text color='text-critical'>colored text</Text>
      .
    </Text>
  </Flex>
);

export default Demo;
