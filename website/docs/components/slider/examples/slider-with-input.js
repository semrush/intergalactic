import React, { useState } from 'react';
import Slider from '@semcore/slider';
import InputNumber from '@semcore/input-number';

const Demo = () => {
  const [value, setValue] = useState(2);
  const handleChange = (v) => {
    setValue(v);
  };

  return (
    <>
      <Slider mb={3} value={value} onChange={handleChange} step={1} min={1} max={3}>
        <Slider.Knob color="#1d9c00" />
        <Slider.Bar color="#8bc83570" />
      </Slider>
      <InputNumber mt={4} w={120} size="m" state="normal">
        <InputNumber.Value max={100} min={0} step={1} value={value} />
        <InputNumber.Controls />
      </InputNumber>
    </>
  );
};

export default Demo;
