import React from 'react';
import Slider from '@semcore/slider';
import { Text } from '@semcore/typography';
import { Box } from '@semcore/flex-box';

const Demo = () => {
    const [value, setValue] = React.useState('medium');

    return (
        <>
            <Box>
                <Text tag='label' size={200} htmlFor='floppa-size'>
                    Default
                </Text>
                <Slider value={50} m='10px' />
            </Box>

            <Box>
                <Text tag='label' size={200} htmlFor='floppa-size'>
                    WithBar and Knob
                </Text>
                <Slider value={50}>
                    <Slider.Bar />
                    <Slider.Knob />
                </Slider>
            </Box>

            <Box>
                <Text tag='label' size={200} htmlFor='floppa-size'>
                    Disabled
                </Text>
                <Slider value={50} disabled />
            </Box>

            <Box>
                <Text tag='label' size={200} htmlFor='floppa-size'>
                    Disabled on background
                </Text>
                <div style={{ background: 'black', padding: '1px' }}>
                    <Slider value={50} disabled m='25px' />
                </div>
            </Box>

            <Box>
            <Text tag='label' size={200} htmlFor='data-chunk-size'>
        Slider with options
      </Text>
      <Box mt={2}>
        <Slider
          value={value}
          onChange={setValue}
          step={1}
          min={1}
          max={3}
          defaultValue='big'
          id='data-chunk-size'
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'big', label: 'Big' },
          ]}
        />
      </Box>
      </Box>

      <Box>
            <Text tag='label' size={200} htmlFor='data-chunk-size'>
        Slider with default value 20
      </Text>
      <Box mt={2}>
      <Slider
          id='slider-represantation'
          mb={4}
        
          onChange={setValue}
          step={1}
          defaultValue='20'
          min={1}
          max={100}
        >
          <Slider.Bar />
          <Slider.Knob />
        </Slider>
        </Box>
            </Box>
        </>
    );
};

export default Demo;
