import React from 'react';
import Slider from 'intergalactic/slider';
import { Text } from 'intergalactic/typography';

const Demo = () => {
  const [value, setValue] = React.useState('medium');

  return (
    <div>
      <Text tag='label' size={200} htmlFor='options-slider'>
        Updates frequency
      </Text>
      <Slider
        mt={4}
        id='options-slider'
        name='options'
        value={value}
        onChange={setValue}
        step={1}
        min={1}
        max={3}
        options={[
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
        ]}
      />
    </div>
  );
};

export default Demo;
