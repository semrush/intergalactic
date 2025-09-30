import { Box } from '@semcore/ui/flex-box';
import Slider from '@semcore/ui/slider';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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
