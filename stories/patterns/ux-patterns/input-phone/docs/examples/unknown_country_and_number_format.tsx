import CloseM from '@semcore/icon/Close/m';
import { Flex } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState('+');
  return (
    <Flex direction='column'>
      <Text tag='label' htmlFor='basic-example' size={200}>
        Phone number
      </Text>
      <Input w={180} mt={2}>
        <Input.Value
          id='basic-example'
          type='tel'
          autoComplete='tel'
          value={value}
          onChange={(v) => setValue(v)}
        />
        {value.length > 1 && (
          <Input.Addon>
            <ButtonLink
              use='secondary'
              addonLeft={CloseM}
              aria-label='Clear'
              onClick={() => setValue('+')}
            />
          </Input.Addon>
        )}
      </Input>
    </Flex>
  );
};

export default Demo;
