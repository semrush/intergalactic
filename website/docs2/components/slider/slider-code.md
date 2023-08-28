---
title: Example
fileSource: slider
tabs: Slider('slider'), A11y('slider-a11y'), API('slider-api'), Example('slider-code'), Changelog('slider-changelog')
---

## Slider with options

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import Slider from '@semcore/ui/slider';

const Demo = () => {
  const [value, setValue] = useState('medium');

  return (
    <Slider
      value={value}
      onChange={setValue}
      step={1}
      min={1}
      max={3}
      options={[
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'big', label: 'Big' },
      ]}
    />
  );
};


</script>

:::

## Customized options view

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import Slider from '@semcore/ui/slider';

const Demo = () => {
  const [value, setValue] = useState('medium');

  return (
    <Slider
      w={200}
      mb={3}
      value={value}
      onChange={setValue}
      step={1}
      min={1}
      max={3}
      options={[
        { value: 'small', label: 'Small Floppa' },
        { value: 'medium', label: 'Medium Floppa' },
        { value: 'big', label: 'Big Floppa' },
      ]}
    >
      <Slider.Bar />
      <Slider.Knob />
      <Slider.Options mt={3}>
        <Slider.Item style={{ transform: 'rotate(-45deg)' }} />
      </Slider.Options>
    </Slider>
  );
};


</script>

:::

## Numeric slider

The Slider can be used in conjunction with the [InputNumber](/components/input-number/) component. Additionally, if you input a value that is either too large or too small into the InputNumber, an error will be displayed.

::: sandbox

<script lang="tsx">
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
        interaction='click'
        theme='warning'
        placement='right'
      >
        <InputNumber mt={4} w={140} size='m' state={error ? 'invalid' : 'normal'}>
          <InputNumber.Value step={1} value={value.toString()} onChange={handleInput} />
          <InputNumber.Controls showControls />
        </InputNumber>
      </Tooltip>
    </>
  );
};


</script>

:::
