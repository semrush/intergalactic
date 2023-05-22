import React from 'react';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import Textarea from '@semcore/ui/textarea';
import Counter from '@semcore/ui/counter';
import { ScreenReaderOnly } from '@semcore/ui/utils/ScreenReaderOnly';

export default () => (
  <Flex direction="column" w={350}>
    <Flex mb={2} justifyContent="space-between">
      <Text size={200} tag="label" htmlFor="limited-text-field">
        Label <ScreenReaderOnly>characters limit</ScreenReaderOnly>
        <Counter ml={1}>
          {0}
          <ScreenReaderOnly>characters</ScreenReaderOnly>
          <span aria-hidden="true">/</span>
          <ScreenReaderOnly>of</ScreenReaderOnly>
          {150}
          <ScreenReaderOnly>maximum</ScreenReaderOnly>
        </Counter>
      </Text>
      <Text size={200} color="gray70" id="limited-text-field">
        optional
      </Text>
    </Flex>
    <Textarea placeholder="Placeholder" />
  </Flex>
);
