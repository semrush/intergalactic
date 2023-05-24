import React, { useState } from 'react';
import Slider from '@semcore/ui/slider';
import InputNumber from '@semcore/ui/input-number';
import Tooltip from '@semcore/ui/tooltip';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, setValue] = useState(51);
  const [error, setError] = useState('');
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
      <Box w={140}>
        <Slider mb={3} value={value} onChange={setValue} step={1} min={min} max={max}>
          <Slider.Bar />
          <Slider.Knob />
        </Slider>
      </Box>
      <Tooltip
        title={`Please enter a valid value within ${min} and ${max}.`}
        visible={!!error}
        interaction="click"
        theme="warning"
        placement="right"
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
