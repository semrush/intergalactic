import { Box } from '@semcore/ui/base-components';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const options = Array(6)
  .fill('')
  .map((_, index) => ({ value: index, children: `Option ${index}` }));

const Demo = () => (
  <>
    <Box mb={2}>
      <Text size={200} tag='label' htmlFor='select-linktrigger'>
        Select merged with LinkTrigger
      </Text>
    </Box>
    <Select tag={LinkTrigger} options={options} id='select-linktrigger' />
  </>
);

export default Demo;
