import React from 'react';
import Input from '@semcore/input';
import { ButtonLink } from '@semcore/button';
import CloseM from '@semcore/icon/Close/m';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

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
            <ButtonLink
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
