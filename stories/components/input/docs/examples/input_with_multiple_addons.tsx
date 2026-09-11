import CloseM from '@semcore/icon/Close/m';
import ShowNoM from '@semcore/icon/ShowNo/m';
import ShowYesM from '@semcore/icon/ShowYes/m';
import { Box } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import Input from '@semcore/ui/input';
import Link from '@semcore/ui/link';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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
            autoComplete='current-password'
            value={value}
            onChange={(v) => setValue(v)}
            id='2addon-example'
          />
          {value && (
            <Input.Addon>
              <ButtonLink
                addonLeft={CloseM}
                use='secondary'
                title='Clear'
                onClick={() => setValue('')}
              />
            </Input.Addon>
          )}
          <Input.Addon>
            <Link>Forgot?</Link>
          </Input.Addon>
          <Input.Addon>
            <ButtonLink
              title={type === 'password' ? 'Show password' : 'Hide password'}
              use='secondary'
              addonLeft={type === 'password' ? ShowYesM : ShowNoM}
              onClick={() => setType((type) => (type === 'password' ? 'text' : 'password'))}
            />
          </Input.Addon>
        </Input>
      </Box>
    </>
  );
};

export default Demo;
