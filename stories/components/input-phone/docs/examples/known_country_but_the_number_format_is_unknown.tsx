import React from 'react';
import Input from '@semcore/input';
import { Hint } from '@semcore/tooltip';
import { ButtonLink } from '@semcore/button';
import Flag from '@semcore/flags';
import CloseM from '@semcore/icon/Close/m';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('1');
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='phone-number'>
        Phone number
      </Text>
      <Input w={180} mt={2}>
        <Input.Addon>
          <Flag iso2='US' />
        </Input.Addon>
        <Input.Value
          value={value}
          onChange={(v) => setValue(v)}
          id='phone-number'
          type='tel'
          autoComplete='tel'
        />
        {Number.parseInt(value, 10) > 2 && (
          <Input.Addon>
            <ButtonLink
              use='secondary'
              addonLeft={CloseM}
              title='Clear'
              onClick={() => setValue('1')}
            />
          </Input.Addon>
        )}
      </Input>
    </Flex>
  );
};

export default Demo;
