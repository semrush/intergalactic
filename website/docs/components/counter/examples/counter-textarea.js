import React from 'react';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Textarea from '@semcore/textarea';
import Counter from '@semcore/counter';

export default () => (
  <Flex direction="column" w={350}>
    <Flex mb={1} justifyContent="space-between">
      <Text size={100}>
        Label<Counter ml={1}>0/150</Counter>
      </Text>
      <Text size={100} color="gray70">
        optional
      </Text>
    </Flex>
    <Textarea placeholder="Placeholder" />
  </Flex>
);
