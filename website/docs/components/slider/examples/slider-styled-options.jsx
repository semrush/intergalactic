import React, { useState } from 'react';
import Slider from '@semcore/slider';

const Demo = () => {
  const [value, setValue] = useState('medium');

  return (
    <Slider
      w={200}
      mb={3}
      value={value}
      onChange={setValue}
      step={1}
      min={1}
      max={3}
      options={[
        { value: 'small', label: 'Small Floppa' },
        { value: 'medium', label: 'Medium Floppa' },
        { value: 'big', label: 'Big Floppa' },
      ]}
    >
      <Slider.Bar />
      <Slider.Knob />
      <Slider.Options mt={3}>
        <Slider.Item style={{ transform: 'rotate(-45deg)' }} />
      </Slider.Options>
    </Slider>
  );
};

export default Demo;
