import React from 'react';
import Input from '@semcore/input';
import CloseM from '@semcore/icon/Close/m';
import { ButtonLink } from '@semcore/button';
import { Hint } from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

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
          <Input.Addon>
            <Hint
              tag={ButtonLink}
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
