import React, { useState } from 'react';
import Slider from '@semcore/slider';

const Demo = () => {
  const [value, setValue] = useState('medium');

  return (
    <Slider
      value={value}
      onChange={setValue}
      step={1}
      min={1}
      max={3}
      options={[
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'big', label: 'Big' },
      ]}
    />
  );
};

export default Demo;
