import React, { useState } from 'react';
import Input from '@semcore/ui/input';
import CloseXS from '@semcore/ui/icon/Close/m';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <Text tag='label' htmlFor='clear-example' size='200'>
        Clearable input
      </Text>
      <Box mt={2}>
        <Input w={240}>
          <Input.Value
            placeholder='Type something to clear something 😏'
            value={value}
            onChange={(v) => setValue(v)}
            id='clear-example'
          />
          {value && (
            <Input.Addon
              tag={CloseXS}
              interactive
              aria-label='Clear field'
              onClick={() => setValue('')}
            />
          )}
        </Input>
      </Box>
    </>
  );
};

export default Demo;
