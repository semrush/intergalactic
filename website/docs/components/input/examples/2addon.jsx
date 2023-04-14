import React, { useState } from 'react';
import Input from '@semcore/ui/input';
import Link from '@semcore/ui/link';
import CloseXS from '@semcore/ui/icon/Close/m';
import ShowYesXS from '@semcore/ui/icon/ShowYes/m';
import ShowNoXS from '@semcore/ui/icon/ShowNo/m';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';

const Demo = () => {
  const [value, setValue] = useState('');
  const [type, setType] = useState('password');

  return (
    <>
      <Text tag="label" htmlFor="2addon-example" size="300">
        Your password
      </Text>
      <Box mt={2}>
        <Input w={360}>
          <Input.Value
            defaultValue="I_like_cats"
            type={type}
            value={value}
            onChange={(v) => setValue(v)}
            id="2addon-example"
          />
          {value && (
            <Input.Addon
              tag={CloseXS}
              pl={2}
              pr={1}
              interactive
              aria-label="Clear password field"
              onClick={() => setValue('')}
            />
          )}
          <Input.Addon px={1}>
            <Link>Forgot?</Link>
          </Input.Addon>
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
