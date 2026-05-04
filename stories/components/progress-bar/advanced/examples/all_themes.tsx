import { Box, Flex } from '@semcore/ui/base-components';
import ProgressBar from '@semcore/ui/progress-bar';
import React from 'react';

export default function AllThemes() {
  return (
    <Flex direction='column' gap={6}>
      <Flex gap={6} flexWrap alignItems='flex-start' direction='column'>
        <Box w={240}>
          <ProgressBar value={0} aria-label='Progress 0%' />
        </Box>
        <Box w={240}>
          <ProgressBar value={40} aria-label='Progress 40%' />
        </Box>
        <Box w={240}>
          <ProgressBar value={100} aria-label='Progress 100%' />
        </Box>
      </Flex>
      <Box
        p={4}
        style={{
          background: 'var(--intergalactic-bg-primary-invert)',
          borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
        }}
      >
        <Flex gap={6} flexWrap alignItems='flex-start' direction='column'>
          <Box w={240}>
            <ProgressBar
              theme='dark'
              value={0}
              aria-label='Progress 0%, dark theme on dark background'
            />
          </Box>
          <Box w={240}>
            <ProgressBar
              theme='dark'
              value={40}
              aria-label='Progress 40%, dark theme on dark background'
            />
          </Box>
          <Box w={240}>
            <ProgressBar
              theme='dark'
              value={100}
              aria-label='Progress 100%, dark theme on dark background'
            />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
