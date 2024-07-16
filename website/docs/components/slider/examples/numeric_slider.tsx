import React from 'react';
import Slider from 'intergalactic/slider';
import InputNumber from 'intergalactic/input-number';
import Tooltip from 'intergalactic/tooltip';
import { Box } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';

const Demo = () => {
  const [value, setValue] = React.useState(51);
  const [error, setError] = React.useState('');
  const min = 10;
  const max = 100;

  const handleInput = (value) => {
    if (!!value && (value > max || value < min)) {
      setError('Please enter a valid value');
      setValue(value);
    } else {
      setError('');
      setValue(value);
    }
  };

  return (
    <>
      <Text tag='label' size={200} htmlFor='slider-represantation'>
        Slider representation
      </Text>
      <Box w={140}>
        <Slider
          id='slider-represantation'
          aria-label='Number slider representation'
          mb={3}
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
      <Box mt={2}>
        <Tooltip
          title={`Please enter a valid value within ${min} and ${max}.`}
          visible={!!error}
          interaction='click'
          theme='warning'
          placement='right'
        >
          <InputNumber mt={2} w={140} size='m' state={error ? 'invalid' : 'normal'}>
            <InputNumber.Value
              id='numeric-value-represantation'
              step={1}
              value={value.toString()}
              onChange={handleInput}
            />
            <InputNumber.Controls showControls />
          </InputNumber>
        </Tooltip>
      </Box>
    </>
  );
};

export default Demo;
