import React from 'react';
import Input from '@semcore/input';
import { Text } from '@semcore/typography';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  return (
    <>
      <Text size={300} id='label-l' tag='label' htmlFor='permanent-placeholder-l-example'>
        Input with permanent text, size L
      </Text>
      <Box mt={2} mb={4}>
        <Input size='l' w={300}>
          <Input.Addon pr={1}>
            <Text color='text-secondary' id='prefix-l'>
              Permanent text:
            </Text>
          </Input.Addon>
          <Input.Value
            placeholder='Placeholder'
            aria-labelledby='label-l prefix-l'
            id='permanent-placeholder-l-example'
          />
        </Input>
      </Box>
      <Text size={200} id='label-m' tag='label' htmlFor='permanent-placeholder-m-example'>
        Input with permanent text, size M
      </Text>
      <Box mt={2}>
        <Input size='m' w={300}>
          <Input.Addon pr={1}>
            <Text color='text-secondary' id='prefix-m'>
              Permanent text:
            </Text>
          </Input.Addon>
          <Input.Value
            placeholder='Placeholder'
            aria-labelledby='label-m prefix-m'
            id='permanent-placeholder-m-example'
          />
        </Input>
      </Box>
    </>
  );
};

export default Demo;
