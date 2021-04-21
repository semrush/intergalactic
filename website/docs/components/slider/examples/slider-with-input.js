import React, { useState } from 'react';
import Slider from '@semcore/slider';
import InputNumber from '@semcore/input-number';
import Tooltip from '@semcore/tooltip';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  const [value, setValue] = useState(51);
  const [error, setError] = useState('');
  const min = 10;
  const max = 100;

  const handleChange = (value) => {
    setValue(value);
  };

  const handleInput = (value) => {
    if (value > max || value < min) {
      setError(`Please enter a valid value`);
    } else {
      setError('');
      setValue(value);
    }
  };

  return (
    <>
      <Box w={140}>
        <Slider mb={3} value={value} onChange={handleChange} step={1} min={min} max={max}>
          <Slider.Knob />
          <Slider.Bar />
        </Slider>
      </Box>
      <Tooltip
        title={`Please enter a valid value within ${min} and ${max}.`}
        visible={!!error}
        interaction="click"
        theme="warning"
        placement="top-start"
      >
        <InputNumber mt={4} w={140} size="m" state={!!error ? 'invalid' : 'normal'}>
          <InputNumber.Value step={1} value={value} onChange={handleInput} />
          <InputNumber.Controls showControls />
        </InputNumber>
      </Tooltip>
    </>
  );
};

export default Demo;
