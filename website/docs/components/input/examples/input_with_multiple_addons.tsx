import React from 'react';
import Input from 'intergalactic/input';
import Link from 'intergalactic/link';
import CloseM from 'intergalactic/icon/Close/m';
import ShowYesM from 'intergalactic/icon/ShowYes/m';
import ShowNoM from 'intergalactic/icon/ShowNo/m';
import { Text } from 'intergalactic/typography';
import { Box } from 'intergalactic/flex-box';
import Button from 'intergalactic/button';
import { Hint } from 'intergalactic/tooltip';

const Demo = () => {
  const [value, setValue] = React.useState('');
  const [type, setType] = React.useState('password');

  return (
    <>
      <Text tag='label' htmlFor='2addon-example' size={200}>
        Your password
      </Text>
      <Box mt={2}>
        <Input w={320}>
          <Input.Value
            defaultValue='I_like_cats'
            type={type}
            value={value}
            onChange={(v) => setValue(v)}
            id='2addon-example'
          />
          {value && (
            <Input.Addon pl={2} pr={1}>
              <Hint tag={CloseM} interactive title='Clear' onClick={() => setValue('')} />
            </Input.Addon>
          )}
          <Input.Addon px={2}>
            <Link>Forgot?</Link>
          </Input.Addon>
          <Hint
            title={type === 'password' ? 'View password' : 'Hide password'}
            aria-label={undefined}
          >
            <Input.Addon
              aria-label={type === 'password' ? 'View password' : 'Hide password'}
              mr='-1px'
              tag={Button}
              onClick={() => setType((type) => (type === 'password' ? 'text' : 'password'))}
            >
              {type === 'password' ? <ShowYesM /> : <ShowNoM />}
            </Input.Addon>
          </Hint>
        </Input>
      </Box>
    </>
  );
};

export default Demo;
