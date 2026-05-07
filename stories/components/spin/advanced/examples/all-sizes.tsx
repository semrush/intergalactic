import { Box, Flex } from '@semcore/ui/flex-box';
import Spin from '@semcore/ui/spin';
import React from 'react';

export default function AllSizes() {
  return (
    <Flex gap={8} alignItems='flex-start'>
      <Flex direction='column' gap={6}>
        <Flex gap={8} flexWrap alignItems='center'>
          <Spin size='xs' />
          <Spin size='s' />
          <Spin />
        </Flex>
        <Flex gap={8} flexWrap alignItems='center'>
          <Spin size='l' />
          <Spin size='xl' />
          <Spin size='xxl' />
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
          <Flex gap={8} flexWrap alignItems='center'>
            <Spin size='xs' theme='invert' />
            <Spin size='s' theme='invert' />
            <Spin theme='invert' />
          </Flex>
          <Flex gap={8} flexWrap alignItems='center'>
            <Spin size='l' theme='invert' />
            <Spin size='xl' theme='invert' />
            <Spin size='xxl' theme='invert' />
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
