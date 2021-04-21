import React from 'react';
import Slider from '@semcore/slider';
import { Box, Flex } from '@semcore/flex-box';

const Demo = () => {
  return (
    <Box w={140} color="#757575">
      <Slider mb={3} value={2} step={1} min={1} max={3} />
      <Flex justifyContent="space-between">
        <Box>Small</Box>
        <Box>Medium</Box>
        <Box>Big</Box>
      </Flex>
    </Box>
  );
};

export default Demo;
