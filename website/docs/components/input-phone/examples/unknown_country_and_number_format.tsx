import React from 'react';
import Input from 'intergalactic/input';
import CloseM from 'intergalactic/icon/Close/m';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('+');
  return (
    <Flex direction='column'>
      <Text tag='label' htmlFor='basic-example' size={200} mr={2}>
        Phone number
      </Text>
      <Input w={180} mt={2}>
        <Input.Value id='basic-example' value={value} onChange={(v) => setValue(v)} />
        {value.length > 1 && (
          <Input.Addon
            tag={CloseM}
            interactive
            aria-label='Clear field'
            color='icon-secondary-neutral'
            onClick={() => setValue('+')}
          />
        )}
      </Input>
    </Flex>
  );
};

export default Demo;
