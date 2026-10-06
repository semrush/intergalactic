import { Box, Flex } from '@semcore/ui/base-components';
import type { NSSpin } from '@semcore/ui/spin';
import SpinContainer from '@semcore/ui/spin-container';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const SIZES: NSSpin.Size[] = ['xs', 's', 'm', 'l', 'xl', 'xxl'];

const Sample = ({ size, theme }: { size: NSSpin.Size; theme: 'default' | 'invert' }) => (
  <Flex direction='column' gap={2} alignItems='center'>
    <SpinContainer loading size={size} theme={theme}>
      <Box w={120} h={90}>
        <Text size={200} color={theme === 'invert' ? 'text-primary-invert' : 'text-primary'}>
          Hello world
        </Text>
      </Box>
    </SpinContainer>
    <Text color='text-secondary' size={100}>
      size='{size}'
    </Text>
  </Flex>
);

export default function AllSizes() {
  return (
    <Flex gap={8} alignItems='flex-start' data-testid='spin-container-all-sizes'>
      <Flex direction='column' gap={6}>
        <Flex gap={8} flexWrap alignItems='flex-start'>
          {SIZES.slice(0, 3).map((size) => (
            <Sample key={size} size={size} theme='default' />
          ))}
        </Flex>
        <Flex gap={8} flexWrap alignItems='flex-start'>
          {SIZES.slice(3).map((size) => (
            <Sample key={size} size={size} theme='default' />
          ))}
        </Flex>
      </Flex>

      <Box
        p={4}
        style={{
          background: 'var(--intergalactic-bg-primary-invert)',
          borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
        }}
      >
        <Flex direction='column' gap={6}>
          <Flex gap={8} flexWrap alignItems='flex-start'>
            {SIZES.slice(0, 3).map((size) => (
              <Sample key={size} size={size} theme='invert' />
            ))}
          </Flex>
          <Flex gap={8} flexWrap alignItems='flex-start'>
            {SIZES.slice(3).map((size) => (
              <Sample key={size} size={size} theme='invert' />
            ))}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
