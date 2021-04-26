import React, { useState } from 'react';
import Slider from '@semcore/slider';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  const [value, setValue] = useState(20);
  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <Box w={140}>
      <Slider mt={5} value={value} onChange={handleChange}>
        <Slider.Bar color="#B880FF" />
        <Slider.Knob color="#421983" />
      </Slider>
    </Box>
  );
};

export default Demo;
