import React from 'react';
import Input from 'intergalactic/input';
import { Text } from 'intergalactic/typography';
import { Box } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <>
      <Text size={300}>Input with permanent text</Text>
      <Box mt={2} mb={4}>
        <Input size='l' w={300}>
          <Input.Addon pr='3px'>
            <Text color='text-secondary' tag='label' htmlFor='permanent-placeholder-l-example'>
              Permanent text:
            </Text>
          </Input.Addon>
          <Input.Value placeholder='Placeholder' id='permanent-placeholder-l-example' />
        </Input>
      </Box>
      <Text size={200}>Input with permanent text</Text>
      <Box mt={2}>
        <Input size='m' w={300}>
          <Input.Addon pr='2px'>
            <Text color='text-secondary' tag='label' htmlFor='permanent-placeholder-m-example'>
              Permanent text:
            </Text>
          </Input.Addon>
          <Input.Value placeholder='Placeholder' id='permanent-placeholder-m-example' />
        </Input>
      </Box>
    </>
  );
};

export default Demo;
