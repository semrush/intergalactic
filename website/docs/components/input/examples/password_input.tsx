import React from 'react';
import Input from 'intergalactic/input';
import ShowYesM from 'intergalactic/icon/ShowYes/m';
import ShowNoM from 'intergalactic/icon/ShowNo/m';
import { ButtonLink } from 'intergalactic/button';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';
import { Hint } from 'intergalactic/tooltip';

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
