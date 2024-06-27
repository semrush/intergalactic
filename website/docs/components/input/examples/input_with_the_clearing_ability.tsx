import React from 'react';
import Input from 'intergalactic/input';
import CloseM from 'intergalactic/icon/Close/m';
import { Text } from 'intergalactic/typography';
import { Box } from 'intergalactic/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <Text tag='label' htmlFor='clear-example' size={200}>
        Clearable input
      </Text>
      <Box mt={2}>
        <Input w={320}>
          <Input.Value
            placeholder='Type something to clear something'
            value={value}
            onChange={(v) => setValue(v)}
            id='clear-example'
          />
          {value && (
            <Input.Addon
              tag={CloseM}
              interactive
              aria-label='Clear'
              onClick={() => setValue('')}
            />
          )}
        </Input>
      </Box>
    </>
  );
};

export default Demo;
