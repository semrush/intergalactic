import { Box, Flex } from '@semcore/ui/flex-box';
import Divider from '@semcore/ui/divider';
import React from 'react';

export default function AllThemes() {
  return (
    <Flex gap={8} flexWrap alignItems='flex-start'>
      <Flex direction='column' w={60} gap={2}>
        <Divider use='primary' />
      </Flex>
      <Flex direction='column' w={60} gap={2}>
        <Divider use='secondary' />
      </Flex>
      <Flex alignItems='center' h={40} gap={2}>
        <Divider orientation='vertical' use='primary' h={32} />
      </Flex>
      <Flex alignItems='center' h={40} gap={2}>
        <Divider orientation='vertical' use='secondary' h={32} />
      </Flex>
      <Box
        p={4}
        style={{
          background: 'var(--intergalactic-bg-primary-invert)',
          borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
        }}
      >
        <Flex gap={8} flexWrap alignItems='flex-start'>
          <Flex direction='column' w={60} gap={2}>
            <Divider use='primary' theme='invert' />
          </Flex>
          <Flex direction='column' w={60} gap={2}>
            <Divider use='secondary' theme='invert' />
          </Flex>
          <Flex alignItems='center' h={40} gap={2}>
            <Divider orientation='vertical' use='primary' theme='invert' h={32} />
          </Flex>
          <Flex alignItems='center' h={40} gap={2}>
            <Divider orientation='vertical' use='secondary' theme='invert' h={32} />
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
