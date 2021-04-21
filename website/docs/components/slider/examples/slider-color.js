import React from 'react';
import Slider from '@semcore/slider';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  return (
    <Box w={140}>
      <Slider mt={5} value={20}>
        <Slider.Knob color="#421983" />
        <Slider.Bar color="#B880FF" />
      </Slider>
    </Box>
  );
};

export default Demo;
