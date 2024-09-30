import React from 'react';
import Input from 'intergalactic/input';
import { Hint } from 'intergalactic/tooltip';
import { ButtonLink } from 'intergalactic/button';
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
      <Input w={180} mt={2} aria-label='country detected USA'>
        <Input.Addon>
          <Flag iso2='US' />
        </Input.Addon>
        <Input.Value value={value} onChange={(v) => setValue(v)} id='phone-number' />
        {Number.parseInt(value, 10) > 2 && (
          <Input.Addon>
            <Hint
              tag={ButtonLink}
              use='secondary'
              addonLeft={CloseM}
              title='Clear'
              onClick={() => setValue('+1')}
            />
          </Input.Addon>
        )}
      </Input>
    </Flex>
  );
};

export default Demo;
