import React from 'react';
import InputMask from '@semcore/input-mask';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

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
          id='basic-example'
          aria-describedby='basic-example-hint'
          autoComplete='cc-number'
        />
      </InputMask>
      <Text size={100} color='gray-500' id='basic-example-hint'>
        Please enter the 16-digit number of your debit card.
      </Text>
    </Flex>
  );
};

export default Demo;
