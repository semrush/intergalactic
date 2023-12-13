import React from 'react';
import { DonutChartSkeleton } from '@semcore/ui/skeleton';
import { Box, Flex } from '@semcore/ui/flex-box';

export default () => (
  <Flex>
    <DonutChartSkeleton h={300} />
    <Box w='10%' />
    <DonutChartSkeleton />
  </Flex>
);
