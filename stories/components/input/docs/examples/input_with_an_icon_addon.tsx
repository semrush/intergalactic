import SearchM from '@semcore/icon/Search/m';
import { Box } from '@semcore/ui/base-components';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Text size={200} id='label-m' tag='label' htmlFor='permanent-placeholder-m-example'>
        Input with icon, size M
      </Text>
      <Box mt={2} mb={4}>
        <Input size='m' w={300}>
          <Input.Addon>
            <SearchM />
          </Input.Addon>
          <Input.Value
            placeholder='Placeholder'
            aria-labelledby='label-m prefix-m'
            id='permanent-placeholder-m-example'
          />
        </Input>
      </Box>
      <Text size={300} id='label-l' tag='label' htmlFor='permanent-placeholder-l-example'>
        Input with icon, size L
      </Text>
      <Box mt={2}>
        <Input size='l' w={300}>
          <Input.Addon>
            <SearchM />
          </Input.Addon>
          <Input.Value
            placeholder='Placeholder'
            aria-labelledby='label-l prefix-l'
            id='permanent-placeholder-l-example'
          />
        </Input>
      </Box>
    </>
  );
};

export default Demo;
