import { Flex } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import CloseM from '@semcore/ui/icon/Close/m';
import Input from '@semcore/ui/input';
import { Hint } from '@semcore/ui/tooltip';
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
              title='Clear'
              onClick={() => setValue('+')}
            />
          </Input.Addon>
        )}
      </Input>
    </Flex>
  );
};

export default Demo;
