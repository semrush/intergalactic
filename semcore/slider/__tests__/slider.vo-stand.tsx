import { Box, Flex } from '@semcore/flex-box';
import React from 'react';
import Slider from '../src';

const VoStand: React.FC = () => {
  const [value, setValue] = React.useState(2);
  return (
    <Box w={140} color="#757575">
      <Slider mb={3} value={value} onChange={setValue} step={1} min={1} max={3} />
      <Flex justifyContent="space-between">
        <Box>Small</Box>
        <Box>Medium</Box>
        <Box>Big</Box>
      </Flex>
    </Box>
  );
};

export default VoStand;
