import React from 'react';
import { Text } from 'intergalactic/typography';
import { Flex } from '@semcore/ui/flex-box';

const Demo = () => (
  <Flex gap={1} direction='column'>
    <Text size={300} tag='p' mb={2} mt={0}>
      Example sentence with a <Text color='text-success'>colored text</Text>.
    </Text>
    <Text size={300} tag='p' mb={2} mt={0}>
      Example sentence with a <Text color='text-critical'>colored text</Text>.
    </Text>
  </Flex>
);

export default Demo;
