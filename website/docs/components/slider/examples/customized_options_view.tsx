import React from 'react';
import Slider from 'intergalactic/slider';
import { Text } from 'intergalactic/typography';

const Demo = () => {
  const [value, setValue] = React.useState('medium');

  return (
    <div>
      <Text tag='label' size={200} htmlFor='floppa-slider'>
        Floppa kind
      </Text>
      <Slider
        mt={4}
        id='floppa-slider'
        name='floppa'
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
    </div>
  );
};

export default Demo;
