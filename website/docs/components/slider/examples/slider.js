import React, { useState } from 'react';
import Slider from '@semcore/slider';
import { Box, Flex } from '@semcore/flex-box';

const Demo = () => {
  const [value, setValue] = useState(2);
  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <Box w={140} color="#757575">
      <Slider mb={3} value={value} onChange={handleChange} step={1} min={1} max={3} />
      <Flex justifyContent="space-between">
        <Box>Small</Box>
        <Box>Medium</Box>
        <Box>Big</Box>
      </Flex>
    </Box>
  );
};

export default Demo;
