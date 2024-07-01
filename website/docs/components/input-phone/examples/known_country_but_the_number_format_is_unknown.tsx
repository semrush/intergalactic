import React from 'react';
import Input from 'intergalactic/input';
import Flag from 'intergalactic/flags';
import CloseM from 'intergalactic/icon/Close/m';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('+1');
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='phone-number'>
        Phone number
      </Text>
      <Input w={180} mt={2}>
        <Input.Addon>
          <Flag iso2='US' />
        </Input.Addon>
        <Input.Value value={value} onChange={(v) => setValue(v)} id='phone-number' />
        {Number.parseInt(value, 10) > 2 && (
          <Input.Addon tag={CloseM} interactive aria-label='Clear' onClick={() => setValue('+1')} />
        )}
      </Input>
    </Flex>
  );
};

export default Demo;
