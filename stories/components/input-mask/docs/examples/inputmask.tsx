import { Flex } from '@semcore/ui/base-components';
import InputMask from '@semcore/ui/input-mask';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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
      <Text size={100} color='text-secondary-neutral' id='basic-example-hint'>
        Please enter the 16-digit number of your debit card.
      </Text>
    </Flex>
  );
};

export default Demo;
