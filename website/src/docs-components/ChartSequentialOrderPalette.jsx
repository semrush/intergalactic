import { Text } from '@semcore/typography';
import { Box, Flex } from '@semcore/ui/base-components';
import React from 'react';

const SEQUENTIAL_PALETTES = [
  { name: 'Blue', tokens: ['--blue-100', '--blue-200', '--blue-300', '--blue-400', '--blue-500'] },
  { name: 'Green', tokens: ['--green-100', '--green-200', '--green-300', '--green-400', '--green-500'] },
  { name: 'Salad', tokens: ['--salad-100', '--salad-200', '--salad-300', '--salad-400', '--salad-500'] },
  { name: 'Orange', tokens: ['--orange-100', '--orange-200', '--orange-300', '--orange-400', '--orange-500'] },
  { name: 'Yellow', tokens: ['--yellow-100', '--yellow-200', '--yellow-300', '--yellow-400', '--yellow-500'] },
  { name: 'Red', tokens: ['--red-100', '--red-200', '--red-300', '--red-400', '--red-500'] },
  { name: 'Pink', tokens: ['--pink-100', '--pink-200', '--pink-300', '--pink-400', '--pink-500'] },
  { name: 'Violet', tokens: ['--violet-100', '--violet-200', '--violet-300', '--violet-400', '--violet-500'] },
  { name: 'Gray', tokens: ['--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500'] },
];

function SequentialSwatch({ token }) {
  return (
    <Box
      style={{
        width: 48,
        height: 48,
        borderRadius: 6,
        background: `var(${token})`,
        margin: 4,
        flexShrink: 0,
      }}
      title={token}
    />
  );
}

export default function ChartSequentialOrderPalette() {
  return (
    <Box mb={8}>
      <Flex direction='column' gap={6}>
        {SEQUENTIAL_PALETTES.map(({ name, tokens }) => (
          <Box key={name}>
            <Text tag='h4' size={200} semibold mb={2} color='text-secondary'>
              {name}
            </Text>
            <Flex flexWrap gap={1}>
              {tokens.map((token) => (
                <SequentialSwatch key={token} token={token} />
              ))}
            </Flex>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
