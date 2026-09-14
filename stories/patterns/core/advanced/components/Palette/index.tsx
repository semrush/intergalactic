import { Box, Flex } from '@semcore/ui/base-components';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const COLOR_NAMES = [
  'gray',
  'mint',
  'violet',
  'green',
  'salad',
  'blue',
  'red',
  'pink',
  'yellow',
  'orange',
] as const;

const LIGHTNESS = [50, 75, 100, 200, 300, 400, 450, 500, 600, 700, 800] as const;

export function Palette() {
  return (
    <Flex mt={4} direction='column' gap={1} w='100%'>
      <Flex alignItems='center' gap={1}>
        <Box w={92} flex='0 0 92px' />
        {LIGHTNESS.map((step) => (
          <Text key={step} size={100} color='text-secondary' flex={1} textAlign='center'>
            {step}
          </Text>
        ))}
      </Flex>

      {COLOR_NAMES.map((name) => (
        <Flex key={name} alignItems='center' gap={1}>
          <Text size={200} w={92} flex='0 0 92px' noWrap>
            {name}
          </Text>
          {LIGHTNESS.map((step) => (
            <Box
              key={step}
              flex={1}
              h='20px'
              bg={`${name}-${step}`}
              style={{ borderRadius: 3, boxShadow: 'inset 0 0 0 1px var(--intergalactic-border-secondary, rgb(0 0 0 / 0.06))' }}
            />
          ))}
        </Flex>
      ))}
    </Flex>
  );
}
