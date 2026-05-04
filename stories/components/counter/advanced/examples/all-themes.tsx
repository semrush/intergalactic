import { Box, Flex } from '@semcore/ui/base-components';
import Counter from '@semcore/ui/counter';
import React from 'react';

const SIZES = ['s', 'm', 'l'] as const;

const THEMES_ON_LIGHT = ['info', 'warning', 'danger'] as const;

export default function AllThemes() {
  return (
    <Flex gap={8} alignItems='flex-start' flexWrap='wrap'>
      <Flex direction='column' gap={4}>
        {SIZES.map((size) => (
          <Flex key={size} gap={4} flexWrap alignItems='center'>
            <Counter key={`${size}-default`} size={size}>
              42
            </Counter>
            {THEMES_ON_LIGHT.map((theme) => (
              <Counter key={`${size}-${theme}`} size={size} theme={theme}>
                42
              </Counter>
            ))}
          </Flex>
        ))}
      </Flex>
      <Box
        p={4}
        style={{
          background: 'var(--intergalactic-bg-primary-invert)',
          borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
          width: 'fit-content',
        }}
      >
        <Flex direction='column' gap={4}>
          {SIZES.map((size) => (
            <Flex key={`invert-${size}`}>
              <Counter size={size} theme='bg-primary-neutral'>42</Counter>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}
