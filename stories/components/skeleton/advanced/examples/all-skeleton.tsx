import { Box, Flex } from '@semcore/ui/flex-box';
import Skeleton from '@semcore/ui/skeleton';
import React from 'react';

export default function AllSkeleton() {
  return (
    <Flex gap={8} flexWrap alignItems='flex-start'>
      <Skeleton h={48} w={200}>
        <Skeleton.Text amount={2} />
        <Skeleton.Text w='60%' />
      </Skeleton>
      <Box
        p={4}
        style={{
          background: 'var(--intergalactic-bg-primary-invert)',
          borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
        }}
      >
        <Skeleton h={48} w={200} theme='invert'>
          <Skeleton.Text amount={2} />
          <Skeleton.Text w='60%' />
        </Skeleton>
      </Box>
    </Flex>
  );
}
