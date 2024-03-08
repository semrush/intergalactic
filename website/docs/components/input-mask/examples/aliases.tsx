import React from 'react';
import InputMask from 'intergalactic/input-mask';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

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
          title='4-digit number'
        />
      </InputMask>
      <Text size={100} color='gray-500' id='aliases-example-hint'>
        Write any 4 digits and after
      </Text>
    </Flex>
  );
};

export default Demo;
