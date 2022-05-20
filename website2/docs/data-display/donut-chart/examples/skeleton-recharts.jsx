import React from 'react';
import { PieChartSkeleton } from '@semcore/skeleton';
import { Box, Flex } from '@semcore/flex-box';

export default () => (
  <Flex>
    <PieChartSkeleton viewBox="0 0 180 90" height="90" />
    <Box w="10%" />
    <PieChartSkeleton />
  </Flex>
);
