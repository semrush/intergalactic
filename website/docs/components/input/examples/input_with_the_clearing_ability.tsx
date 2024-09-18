import React from 'react';
import Input from 'intergalactic/input';
import { ButtonLink } from 'intergalactic/button';
import CloseM from 'intergalactic/icon/Close/m';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';
import { Hint } from 'intergalactic/tooltip';

const Demo = () => {
  const [value, setValue] = React.useState('');

  return (
    <Flex direction='column' gap={2}>
      <Text tag='label' htmlFor='clear-example' size={200}>
        Clearable input
      </Text>
      <Input w={320}>
        <Input.Value
          placeholder='Type something to clear something'
          value={value}
          onChange={(v) => setValue(v)}
          id='clear-example'
        />
        {value && (
          <Input.Addon>
            <Hint
              tag={ButtonLink}
              use='secondary'
              addonLeft={CloseM}
              title='Clear'
              onClick={() => setValue('')}
            />
          </Input.Addon>
        )}
      </Input>
    </Flex>
  );
};

export default Demo;
