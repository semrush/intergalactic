import React from 'react';
import InputMask from '@semcore/input-mask';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('99');

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
        />
      </InputMask>
      <Text size={100} color='gray-500' id='aliases-example-hint'>
        Enter any 4 digits
      </Text>
    </Flex>
  );
};

export default Demo;
