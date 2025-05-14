import React from 'react';
import Slider from '@semcore/slider';
import { Text } from '@semcore/typography';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('medium');
  return (
    <>
      <Text tag='label' size={200} htmlFor='data-chunk-size'>
        Data chunk size
      </Text>
      <Box mt={2}>
        <Slider
          value={value}
          onChange={setValue}
          step={1}
          min={1}
          max={3}
          
          id='data-chunk-size'
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'big', label: 'Big' },
          ]}
        />
      </Box>
    </>
  );
};

export default Demo;
