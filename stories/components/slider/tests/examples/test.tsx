import React from 'react';
import Slider from '@semcore/slider';
import { Text } from '@semcore/typography';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('medium');

  return (
    <>
      <Text tag='label' size={200} htmlFor='floppa-size'>
        Floppa size
      </Text>
      <Box mt={2}>
      <Slider value={50} m='10px' />

      <Slider value={50}>
        <Slider.Bar />
        <Slider.Knob />
      </Slider>

      </Box>

      <Text tag='label' size={200} htmlFor='floppa-size'>
        normal state
      </Text>
      <Slider value={50} keyboardFocused />
        <Slider value={50} disabled />
        <div style={{ background: 'black', padding: '1px' }}>
          <Slider value={50} disabled m='25px' />
        </div>

        <Slider
          value={'small'}
          step={1}
          min={1}
          max={3}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'big', label: 'Big' },
          ]}
        />,

    </>
  );
};

export default Demo;
