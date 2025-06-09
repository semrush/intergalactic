import { LinkTrigger } from '@semcore/base-trigger';
import { Box } from '@semcore/flex-box';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
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
