import { Box, Flex } from '@semcore/ui/base-components';
import InputNumber from '@semcore/ui/input-number';
import Slider from '@semcore/ui/slider';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState(51);
  const [error, setError] = React.useState('');
  const min = 10;
  const max = 100;

  const handleInput = (value: any) => {
    if (!!value && (value > max || value < min)) {
      setError('Please enter a valid value');
      setValue(value);
    } else {
      setError('');
      setValue(value);
    }
  };

  const handleSliderInput = (value: number) => {
    if (value > max || value < min) {
      setError('Please enter a valid value');
      setValue(value);
    } else {
      setError('');
      setValue(value);
    }
  };

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='slider-represantation' mb={2}>
        Slider representation
      </Text>
      <Box w={140}>
        <Slider
          id='slider-represantation'
          mb={4}
          value={value}
          onChange={handleSliderInput}
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
        visible={!!error}
        interaction='click'
        theme='warning'
        placement='right'
      >
        <InputNumber tag={Tooltip.Trigger} mt={2} w={80} size='m' state={error ? 'invalid' : 'normal'}>
          <InputNumber.Value
            id='numeric-value-represantation'
            step={1}
            value={value.toString()}
            onChange={handleInput}
          />
          <InputNumber.Controls showControls />
        </InputNumber>
        <Tooltip.Popper>
          Please enter a valid value within {min} and {max}.
        </Tooltip.Popper>
      </Tooltip>
    </Flex>
  );
};

export default Demo;
