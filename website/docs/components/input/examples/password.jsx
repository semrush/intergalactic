import React from 'react';
import Input from '@semcore/ui/input';
import ShowYesXS from '@semcore/ui/icon/ShowYes/m';
import ShowNoXS from '@semcore/ui/icon/ShowNo/m';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const [type, setType] = React.useState('password');

  return (
    <>
      <Text tag="label" htmlFor="password-example">
        Your password
      </Text>
      <Box mt={2}>
        <Input w={240}>
          <Input.Value
            defaultValue="I_like_cats"
            placeholder="Password"
            type={type}
            id="password-example"
          />
          <Input.Addon
            aria-label={type === 'password' ? 'View password' : 'Hide password'}
            tag={Button}
            tabIndex={0}
            onClick={() => setType((type) => (type === 'password' ? 'text' : 'password'))}
          >
            {type === 'password' ? <ShowYesXS /> : <ShowNoXS />}
          </Input.Addon>
        </Input>
      </Box>
    </>
  );
};

export default Demo;
