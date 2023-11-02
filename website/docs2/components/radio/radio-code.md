---
title: Radio
fileSource: radio
tabs: Design('radio'), A11y('radio-a11y'), API('radio-api'), Example('radio-code'), Changelog('radio-changelog')
---

## RadioGroup example

RadioGroup acts as a controlling component and doesn't have an actual HTML element beneath it.

::: sandbox

<script lang="tsx">
import React from 'react';
import Radio, { RadioGroup } from '@semcore/ui/radio';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('1');
  return (
    <div>
      <RadioGroup name='radio' value={value} onChange={(v) => setValue(v)}>
        <div role='radiogroup' aria-labelledby='radioGroup'>
          <Text tag='p' id='radioGroup' size={200}>
            Select value
          </Text>
          <Flex mt={2} direction={'column'}>
            <Radio mb={3} value={'1'} label={'Value 1'} />
            <Radio mb={3} value={'2'} label={'Value 2'} />
            <Radio mb={3} value={'3'} label={'Value 3'} />
          </Flex>
        </div>
      </RadioGroup>
    </div>
  );
};


</script>

:::

## Additional props for input

Radio.Value conceals a stylistic div and a real, hidden input. When you pass props to Radio.Value, it passes specific set of them to input props and all others goes to check-mark div.

If you need more control over input-tag, you can pass props to Radio.Value.Control.

::: warning
:rotating_light: `Radio.Value.RadioMark` should always be the next element after `Radio.Value.Control` in DOM.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import Radio, { RadioGroup } from '@semcore/ui/radio';

const Demo = () => {
  return (
    <RadioGroup>
      <Radio mb={3} value={'1'}>
        <Radio.Value>
          <Radio.Value.Control data-test-id={'TEST_ID'} />
          <Radio.Value.RadioMark />
        </Radio.Value>
        <Radio.Text>Value</Radio.Text>
      </Radio>
      <Radio mb={3} value={'2'} label={'Second value'} />
    </RadioGroup>
  );
};


</script>

:::
