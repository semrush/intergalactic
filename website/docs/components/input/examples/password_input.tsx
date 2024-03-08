import React from 'react';
import Input from 'intergalactic/input';
import ShowYesM from 'intergalactic/icon/ShowYes/m';
import ShowNoM from 'intergalactic/icon/ShowNo/m';
import Button from 'intergalactic/button';
import { Text } from 'intergalactic/typography';
import { Box } from 'intergalactic/flex-box';

const Demo = () => {
  const [type, setType] = React.useState('password');

  return (
    <>
      <Text tag='label' htmlFor='password-example' size={200}>
        Your password
      </Text>
      <Box mt={2}>
        <Input w={240}>
          <Input.Value
            defaultValue='I_like_cats'
            placeholder='Password'
            type={type}
            id='password-example'
          />
          <Input.Addon
            aria-label={type === 'password' ? 'View password' : 'Hide password'}
            tag={Button}
            tabIndex={0}
            onClick={() => setType((type) => (type === 'password' ? 'text' : 'password'))}
          >
            {type === 'password' ? <ShowYesM /> : <ShowNoM />}
          </Input.Addon>
        </Input>
      </Box>
    </>
  );
};

export default Demo;
