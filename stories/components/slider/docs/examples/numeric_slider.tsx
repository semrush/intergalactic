import React from 'react';
import Slider from '@semcore/slider';
import InputNumber from '@semcore/input-number';
import Tooltip from '@semcore/tooltip';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
  const [value, setValue] = React.useState(51);
  const [error, setError] = React.useState('');
  const min = 10;
  const max = 100;

  const handleInput = (value: any) => {
    if (!!value && (value > max ||value < min)) {
      setError('Please enter a valid value');
      setValue(value);
    } else {
      setError('');
      setValue(value);
    }
  };

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='slider-represantation'>
        Slider representation
      </Text>
      <Box w={140}>
        <Slider
          id='slider-represantation'
          mb={4}
          value={value}
          onChange={setValue}
          step={1}
          min={min}
          max={max}
        >
          <Slider.Bar />
          <Slider.Knob />
        </Slider>
      </Box>
      <Text tag='label' size={200} htmlFor='numeric-value-represantation'>
        Numeric value representation
      </Text>
      <Tooltip
        title={`Please enter a valid value within ${min} and ${max}.`}
        visible={!!error}
        interaction='click'
        theme='warning'
        placement='right'
      >
        <InputNumber mt={2} w={80} size='m' state={error ? 'invalid' : 'normal'}>
          <InputNumber.Value
            id='numeric-value-represantation'
            step={1}
            value={value.toString()}
            onChange={handleInput}
          />
          <InputNumber.Controls showControls />
        </InputNumber>
      </Tooltip>
    </Flex>
  );
};

export default Demo;
