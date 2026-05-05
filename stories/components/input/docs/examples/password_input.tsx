import ShowNoM from '@semcore/icon/ShowNo/m';
import ShowYesM from '@semcore/icon/ShowYes/m';
import { Flex } from '@semcore/ui/flex-box';
import { ButtonLink } from '@semcore/ui/button';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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
          <ButtonLink
            title={type === 'password' ? 'Show password' : 'Hide password'}
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
