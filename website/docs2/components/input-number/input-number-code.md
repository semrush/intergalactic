---
title: Example
fileSource: input-number
tabs: Design('input-number'), A11y('input-number-a11y'), API('input-number-api'), Example('input-number-code'), Changelog('input-number-changelog')
---

## Range of values

Use [InputNumber](/components/input-number/input-number) and [NeighborLocation](/utils/neighbor-location/neighbor-location) components. In this case, InputNumber is always used as a controlled component.

::: sandbox

<script lang="tsx">
import React from 'react';
import InputNumber from '@semcore/ui/input-number';
import NeighborLocation from '@semcore/ui/neighbor-location';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

const min = 1;
const max = 8;
const Demo = () => {
  const [from, setFrom] = React.useState(undefined);
  const [to, setTo] = React.useState(undefined);
  const handleBlur = React.useCallback(() => {
    if (from > to) {
      setFrom(to);
      setTo(from);
    }
  }, [from, to]);

  return (
    <>
      <Text tag='p' size={200}>
        <Text tag='label' htmlFor='basic-example-from'>
          From
        </Text>
        /
        <Text tag='label' htmlFor='basic-example-to'>
          To
        </Text>
      </Text>
      <Flex w='20%' mt={2}>
        <NeighborLocation>
          <InputNumber>
            <InputNumber.Value
              min={min}
              max={max}
              value={from}
              onChange={setFrom}
              onBlur={handleBlur}
              placeholder={min.toString()}
              id='basic-example-from'
            />
            <InputNumber.Controls />
          </InputNumber>
          <InputNumber>
            <InputNumber.Value
              min={min}
              max={max}
              value={to}
              onChange={setTo}
              onBlur={handleBlur}
              placeholder={max.toString()}
              id='basic-example-to'
            />
            <InputNumber.Controls />
          </InputNumber>
        </NeighborLocation>
      </Flex>
    </>
  );
};


</script>

:::

## Appearance customization

You have the ability to customize the component's appearance. To ensure the step calculation is accurate, utilize the internal API's native input.

::: sandbox

<script lang="tsx">
import React, { useRef, useState } from 'react';
import NeighborLocation from '@semcore/ui/neighbor-location';
import InputNumber from '@semcore/ui/input-number';
import Button from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const decrement = React.useCallback(() => {
    inputRef.current.stepDown();
    setValue(inputRef.current.value);
  }, []);
  const increment = React.useCallback(() => {
    inputRef.current.stepUp();
    setValue(inputRef.current.value);
  }, []);

  return (
    <>
      <Text tag='label' htmlFor='alternative-example' size={200}>
        Members count
      </Text>
      <Flex w={100} mt={2}>
        <NeighborLocation>
          <Button onClick={decrement} aria-label='Decrease members count by 10'>
            -
          </Button>
          <InputNumber>
            <InputNumber.Value
              placeholder='0'
              ref={inputRef}
              step={10}
              value={value}
              onChange={setValue}
              id='alternative-example'
            />
          </InputNumber>
          <Button onClick={increment} aria-label='Increase members count by 10'>
            +
          </Button>
        </NeighborLocation>
      </Flex>
    </>
  );
};


</script>

:::
