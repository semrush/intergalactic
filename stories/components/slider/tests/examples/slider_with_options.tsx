import { Box } from '@semcore/ui/flex-box';
import Slider from '@semcore/ui/slider';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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
