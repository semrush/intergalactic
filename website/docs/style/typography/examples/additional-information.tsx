import React from 'react';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => (
  <Flex gap={1}>
    <Text size={400} semibold>
      Text example with counter
    </Text>
    <Text size={400} color='text-secondary'>
      12,457
    </Text>
  </Flex>
);

export default Demo;
