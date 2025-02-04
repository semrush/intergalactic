import React from 'react';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from 'intergalactic/typography';

const Demo = () => (
  <Flex direction='column'>
    <Text size={300} tag='p' mb={4} mt={0}>
      This is a paragraph with fs-300 font size. It&apos;s so big that even my neighbor&apos;s cat can read it
      from across the street.
    </Text>
    <Text size={200} tag='p' mb={3} mt={0}>
      This is a paragraph with fs-200 font size. Perfect for when you want to whisper but still be
      heard.
    </Text>
    <Text size={100} tag='p' mb={2} mt={0}>
      This is a paragraph with fs-100 font size. If you can read this, congratulations&mdash;you have
      superhero-level eyesight. If not, it&apos;s probably just a secret message for ants.
    </Text>
  </Flex>
);

export default Demo;
