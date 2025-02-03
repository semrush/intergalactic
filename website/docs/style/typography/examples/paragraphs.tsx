import React from 'react';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from 'intergalactic/typography';

const Demo = () => (
  <Flex direction='column'>
    <Text size={300} tag='p' mb={4} mt={0}>
      Paragraph 16px
    </Text>
    <Text size={200} tag='p' mb={3} mt={0}>
      Paragraph 14px
    </Text>
  </Flex>
);

export default Demo;
