import React from 'react';
import Input from 'intergalactic/input';
import Link from 'intergalactic/link';
import CloseM from 'intergalactic/icon/Close/m';
import ShowYesM from 'intergalactic/icon/ShowYes/m';
import ShowNoM from 'intergalactic/icon/ShowNo/m';
import { Text } from 'intergalactic/typography';
import { Box } from 'intergalactic/flex-box';
import Button from 'intergalactic/button';

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
            <Input.Addon
              tag={CloseM}
              pl={2}
              pr={1}
              interactive
              aria-label='Clear'
              onClick={() => setValue('')}
            />
          )}
          <Input.Addon px={2}>
            <Link>Forgot?</Link>
          </Input.Addon>
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
