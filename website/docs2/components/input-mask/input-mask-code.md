---
title: Example
fileSource: input-mask
tabs: InputMask('index'), A11y('input-mask-a11y'), API('input-mask-api'), Example('input-mask-code'), Changelog('input-mask-changelog')
---

## InputMask

This component is a wrapper that allows you to set the format for the input value.

## Mask

This is an example of a basic input with a `mask` feature. The mask is defined using the mask property, which specifies the input format and validates the entered value.

::: tip
Remember to set the placeholder for the input field to match the mask. Typically, the placeholder should be the same as the mask itself.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import InputMask from '@semcore/ui/input-mask';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <Flex direction='column' gap={2} w={224}>
      <Text tag='label' htmlFor='basic-example' size={200}>
        Card number
      </Text>
      <InputMask w={224}>
        <InputMask.Value
          mask='9999 9999 9999 9999'
          placeholder='____ ____ ____ ____'
          title='16-digit number'
          id='basic-example'
          aria-describedby='basic-example-hint'
        />
      </InputMask>
      <Text size={100} color='gray-500' id='basic-example-hint'>
        Please enter the 16-digit number of your debit card.
      </Text>
    </Flex>
  );
};
</script>

:::

## Aliases

`aliases` is the object that defines how characters in the mask are validated. By default, they are configured as follows:

- `9` - numbers
- `a` - Latin and Cyrillic letters in any case
- `*` - numbers and Latin and Cyrillic letters in any case

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import InputMask from '@semcore/ui/input-mask';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, setValue] = useState('99');

  return (
    <Flex direction='column' gap={2} w={224}>
      <Text tag='label' htmlFor='aliases-example' size={200}>
        Item index
      </Text>
      <InputMask w={224}>
        <InputMask.Value
          id='aliases-example'
          aliases={{ x: /[0-9]/ }}
          mask='99xxxx'
          value={value}
          onChange={setValue}
          aria-describedby='aliases-example-hint'
          title='4-digit number'
        />
      </InputMask>
      <Text size={100} color='gray-500' id='aliases-example-hint'>
        Write any 4 digits and after
      </Text>
    </Flex>
  );
};
</script>

:::

## Pipe

`pipe` is a function that processes and changes the `InputMask` value after user input.

In the example below, it is used for formatting and validating the card's expire date input. The focus is switched to the next input by the `onSucces` event. It is called when the entered value fully matches the input mask.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Box, Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import InputMask from '@semcore/ui/input-mask';

const Demo = () => {
  const expireDateInput = React.useRef(null);
  const handleSuccess = React.useCallback(() => expireDateInput.current.focus(), []);

  return (
    <Box wMax={225} p={8} m='0 auto' style={{ borderRadius: '12px', background: '#F4F5F9' }}>
      <Text
        tag='label'
        size={300}
        medium
        mb={2}
        htmlFor='card_number'
        style={{ display: 'inline-block' }}
      >
        Card number
      </Text>
      <InputMask size='l' mb={4}>
        <InputMask.Value
          mask='9999 9999 9999 9999'
          placeholder='____ ____ ____ ____'
          onSuccess={handleSuccess}
          title='card number – 16-digits'
          id='card_number'
        />
      </InputMask>
      <Flex alignItems='center' justifyContent='flex-end'>
        <Text tag='label' mr={2} size={300} htmlFor='expire_date'>
          Expire date
        </Text>
        <InputMask size='l' wMax={85}>
          <InputMask.Value
            ref={expireDateInput}
            mask='99/99'
            placeholder='MM/YY'
            pipe={pipeExpireDate}
            title='month and year of card expiration – 4 digits in total'
            id='expire_date'
          />
        </InputMask>
      </Flex>
    </Box>
  );
};

const pipeExpireDate = (value) => {
  const indexesOfPipedChars = [];
  const firstMonthDigit = parseInt(value[0], 10);
  if (firstMonthDigit > 1) {
    value = `0${value[0]}/${value.split('/')[1]}`;
    indexesOfPipedChars.push(0);
  }
  const [month, year] = value
    .split('/')
    .map((chunk) => (chunk.includes('_') ? undefined : parseInt(chunk, 10)));
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;

  if (month > 12) return false;
  if (year === currentYear && month < currentMonth) return false;
  if (year < currentYear) return false;

  return { value, indexesOfPipedChars };
};
</script>

:::
