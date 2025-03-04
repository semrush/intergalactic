import React from 'react';
import Input from '@semcore/input';
import ShowYesM from '@semcore/icon/ShowYes/m';
import ShowNoM from '@semcore/icon/ShowNo/m';
import { ButtonLink } from '@semcore/button';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import { Hint } from '@semcore/tooltip';

const Demo = () => {
  const [type, setType] = React.useState('password');

  return (
    <Flex direction='column' gap={2}>
      <Text tag='label' htmlFor='password-example' size={200}>
        Your password
      </Text>
      <Input w={240}>
        <Input.Value
          defaultValue='I_like_cats'
          placeholder='Password'
          type={type}
          autoComplete='current-password'
          id='password-example'
        />
        <Input.Addon>
          <Hint
            title={type === 'password' ? 'Show password' : 'Hide password'}
            tag={ButtonLink}
            use='secondary'
            addonLeft={type === 'password' ? ShowYesM : ShowNoM}
            onClick={() => setType((type) => (type === 'password' ? 'text' : 'password'))}
          />
        </Input.Addon>
      </Input>
    </Flex>
  );
};

export default Demo;
