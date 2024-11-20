import React from 'react';
import { FilterTrigger } from '@semcore/base-trigger';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const Demo = () => (
  <Flex direction='column' gap={2} alignItems='start'>
    <Text tag='label' htmlFor='filter-trigger' size={200}>
      Color
    </Text>
    <Select options={colors} tag={FilterTrigger} id='filter-trigger' />
  </Flex>
);

const colors = ['Blue', 'Gray', 'Green', 'Orange', 'Pink', 'Red', 'Salad', 'Violet', 'Yellow'].map(
  (item) => {
    return { value: item, children: item };
  },
);

export default Demo;
