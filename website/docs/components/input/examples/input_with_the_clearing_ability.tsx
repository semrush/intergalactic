import React from 'react';
import Input from 'intergalactic/input';
import CloseM from 'intergalactic/icon/Close/m';
import { Text } from 'intergalactic/typography';
import { Box } from 'intergalactic/flex-box';
import { Hint } from 'intergalactic/tooltip';

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
            <Input.Addon>
              <Hint
                interactive
                title='Clear'
                tag={CloseM}
                onClick={() => setValue('')}
                color='icon-secondary-neutral'
              />
            </Input.Addon>
          )}
        </Input>
      </Box>
    </>
  );
};

export default Demo;
