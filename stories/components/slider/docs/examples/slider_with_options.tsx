import { Flex } from '@semcore/ui/base-components';
import Slider from '@semcore/ui/slider';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState('medium');
  return (
    <Flex direction='column' gap={2} alignItems='flex-start'>
      <Text tag='label' size={200} htmlFor='data-chunk-size'>
        Data chunk size
      </Text>
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
    </Flex>
  );
};

export default Demo;
