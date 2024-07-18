import React from 'react';
import Slider from 'intergalactic/slider';
import { Text } from 'intergalactic/typography';
import { Box } from 'intergalactic/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('medium');

  return (
    <>
      <Text tag='label' size={200} htmlFor='floppa-size'>
        Floppa size
      </Text>
      <Box mt={2}>
        <Slider
          w={200}
          mb={3}
          value={value}
          onChange={setValue}
          step={1}
          min={1}
          max={3}
          id='floppa-size'
          aria-label='Floapp size'
          options={[
            { value: 'small', label: 'Small Floppa' },
            { value: 'medium', label: 'Medium Floppa' },
            { value: 'big', label: 'Big Floppa' },
          ]}
        >
          <Slider.Bar />
          <Slider.Knob />
          <Slider.Options mt={2}>
            <Slider.Item style={{ transform: 'rotate(-45deg)' }} />
          </Slider.Options>
        </Slider>
      </Box>
    </>
  );
};

export default Demo;
