import React from 'react';
import Select from '@semcore/select';
import { LinkTrigger } from '@semcore/base-trigger';
import { Text } from '@semcore/typography';
import { Box } from '@semcore/flex-box';

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
