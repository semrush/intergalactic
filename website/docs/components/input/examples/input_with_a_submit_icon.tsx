import React from 'react';
import Input from 'intergalactic/input';
import CheckM from 'intergalactic/icon/Check/m';
import { Text } from 'intergalactic/typography';
import { Box } from 'intergalactic/flex-box';

const Demo = () => {
  const [focus, setFocus] = React.useState(false);

  return (
    <>
      <Text tag='label' htmlFor='submit-example' size={200}>
        Input with submit button
      </Text>
      <Box mt={2}>
        <Input w={320}>
          <Input.Value
            placeholder='Write something'
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            id='submit-example'
          />
          {focus && <Input.Addon interactive tag={CheckM} aria-label='Submit' />}
        </Input>
      </Box>
    </>
  );
};

export default Demo;
