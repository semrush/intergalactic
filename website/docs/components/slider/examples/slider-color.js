import React from 'react';
import Slider from '@semcore/slider';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  return (
    <Box w={140}>
      <Slider mt={5} value={20} background="#66ccf750">
        <Slider.Knob color="#1d9c00" />
        <Slider.Bar color="#8bc83550" />
      </Slider>
    </Box>
  );
};

export default Demo;
