import CloseM from '@semcore/icon/Close/m';
import { Flex } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import Flag, { iso2Name } from '@semcore/ui/flags';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState('1');
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='phone-number' id='phone-label'>
        Phone number
      </Text>
      <Input w={180} mt={2}>
        <Input.Addon>
          <Flag iso2='US' role='img' aria-label={iso2Name['US']} id='country-flag' />
        </Input.Addon>
        <Input.Value
          value={value}
          onChange={(v) => setValue(v)}
          id='phone-number'
          type='tel'
          autoComplete='tel'
          aria-labelledby='phone-label country-flag'
        />
        {Number.parseInt(value, 10) > 2 && (
          <Input.Addon>
            <ButtonLink
              use='secondary'
              addonLeft={CloseM}
              aria-label='Clear'
              onClick={() => setValue('1')}
            />
          </Input.Addon>
        )}
      </Input>
    </Flex>
  );
};

export default Demo;
