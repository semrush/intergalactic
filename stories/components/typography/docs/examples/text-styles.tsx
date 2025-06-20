import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = () => (
  <Flex gap={1} direction='column'>
    <Text size={300} tag='p' mb={2} mt={0}>
      Example sentence with a
      {' '}
      <Text bold>bold text</Text>
      .
    </Text>
    <Text size={300} tag='p' mb={2} mt={0}>
      Example sentence with a
      {' '}
      <Text semibold>semibold text</Text>
      .
    </Text>
    <Text size={300} tag='p' mb={2} mt={0}>
      Example sentence with a
      {' '}
      <Text italic>italic text</Text>
      .
    </Text>
    <Text size={300} tag='p' mb={2} mt={0}>
      Example sentence with a
      {' '}
      <Text color='text-success'>colored text</Text>
      .
    </Text>
    <Text size={300} tag='p' mb={2} mt={0}>
      Example sentence with a
      {' '}
      <Text tag='s'>strikethrough text</Text>
      .
    </Text>
    <Text size={300} tag='p' mb={2} mt={0}>
      Example sentence with a
      {' '}
      <Text monospace>monospace text</Text>
      .
    </Text>
    <Text size={300} tag='p' mb={2} mt={0}>
      Example sentence with an
      {' '}
      <Text uppercase>uppercase text</Text>
      .
    </Text>
    <Text size={300} tag='p' mb={2} mt={0}>
      Example sentence with a
      {' '}
      <Text capitalize>capitalized text</Text>
      .
    </Text>
    <Text size={300} tag='p' mb={2} mt={0}>
      Example sentence with a
      {' '}
      <Text lowercase>LOWERCASE TEXT</Text>
      .
    </Text>
  </Flex>
);

export default Demo;
