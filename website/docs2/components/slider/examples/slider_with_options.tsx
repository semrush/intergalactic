import React from 'react';
import Slider from '@semcore/ui/slider';

const Demo = () => {
  const [value, setValue] = React.useState('medium');

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

