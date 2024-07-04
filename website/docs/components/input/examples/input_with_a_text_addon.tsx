import React from 'react';
import Input from 'intergalactic/input';
import { Text } from 'intergalactic/typography';
import { Box } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <>
      <Text tag='label' htmlFor='permanent-placeholder-l-example' size={300}>
        Input with permanent text
      </Text>
      <Box mt={2} mb={4}>
        <Input size='l' w={300}>
          <Input.Addon pr='3px' id='permanent-placeholder-l-addon'>
            <Text color='text-secondary'>Permanent text:</Text>
          </Input.Addon>
          <Input.Value
            placeholder='Placeholder'
            id='permanent-placeholder-l-example'
            aria-labelledby='permanent-placeholder-l-addon'
          />
        </Input>
      </Box>
      <Text tag='label' htmlFor='permanent-placeholder-m-example' size={200}>
        Input with permanent text
      </Text>
      <Box mt={2}>
        <Input size='m' w={300}>
          <Input.Addon pr='2px' id='permanent-placeholder-m-addon'>
            <Text color='text-secondary'>Permanent text:</Text>
          </Input.Addon>
          <Input.Value
            placeholder='Placeholder'
            id='permanent-placeholder-m-example'
            aria-labelledby='permanent-placeholder-m-addon'
          />
        </Input>
      </Box>
    </>
  );
};

export default Demo;
