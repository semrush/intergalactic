import React from 'react';
import Input from 'intergalactic/input';
import { ButtonLink } from 'intergalactic/button';
import CheckM from 'intergalactic/icon/Check/m';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';
import { Hint } from 'intergalactic/tooltip';

const Demo = () => {
  const [value, setValue] = React.useState('');

  return (
    <Flex direction='column' gap={2}>
      <Text tag='label' htmlFor='submit-example' size={200}>
        Input with submit button
      </Text>
      <Input w={320}>
        <Input.Value
          placeholder='Write something'
          value={value}
          onChange={setValue}
          id='submit-example'
        />
        {value && (
          <Input.Addon>
            <Hint
              tag={ButtonLink}
              addonLeft={CheckM}
              color='icon-secondary-success'
              title='Submit'
              onClick={() => setValue('')}
            />
          </Input.Addon>
        )}
      </Input>
    </Flex>
  );
};

export default Demo;
