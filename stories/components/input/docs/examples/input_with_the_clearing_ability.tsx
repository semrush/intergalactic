import CloseM from '@semcore/icon/Close/m';
import { Flex } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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
