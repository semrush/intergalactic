---
title: Radio
fileSource: radio
tabs: Design('radio'), A11y('radio-a11y'), API('radio-api'), Example('radio-code'), Changelog('radio-changelog')
---

## RadioGroup example

RadioGroup acts as a controlling component and doesn't have an actual HTML element beneath it.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import Radio, { RadioGroup } from '@semcore/ui/radio';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, setValue] = useState('1');
  return (
    <div>
      <RadioGroup name='radio' value={value} onChange={(v) => setValue(v)}>
        <div role='radiogroup' aria-labelledby='radioGroup'>
          <Text tag='p' id='radioGroup' size={200}>
            Select value
          </Text>
          <Flex mt={2}>
            <Radio mr={3}>
              <Radio.Value value='1' />
              <Radio.Text>Value 1</Radio.Text>
            </Radio>
            <Radio mr={3}>
              <Radio.Value value='2' />
              <Radio.Text>Value 2</Radio.Text>
            </Radio>
            <Radio mr={3}>
              <Radio.Value value='3' />
              <Radio.Text>Value 3</Radio.Text>
            </Radio>
          </Flex>
        </div>
      </RadioGroup>
    </div>
  );
};


</script>

:::

## Additional props for input

Radio.Value conceals a stylistic div and a real, hidden input. We typically aim to anticipate where certain properties
should be directed, but occasionally, this behavior needs to be modified.

::: sandbox

<script lang="tsx">
import React from 'react';
import Radio from '@semcore/ui/radio';
import { inputProps } from '@semcore/ui/utils/inputProps';

const Demo = () => {
  const includeInputProps = [...inputProps, 'data-test-id'];
  return (
    <Radio>
      <Radio.Value includeInputProps={includeInputProps} data-test-id='value' />
      <Radio.Text>Value</Radio.Text>
    </Radio>
  );
};


</script>

:::
