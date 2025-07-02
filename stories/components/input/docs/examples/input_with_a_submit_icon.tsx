import { Flex } from '@semcore/base-components';
import { ButtonLink } from '@semcore/button';
import CheckM from '@semcore/icon/Check/m';
import Input from '@semcore/input';
import { Hint } from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import React from 'react';

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
