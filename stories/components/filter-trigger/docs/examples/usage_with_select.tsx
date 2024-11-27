import React from 'react';
import { FilterTrigger } from '@semcore/base-trigger';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const Demo = () => (
  <Flex direction='column' gap={2} alignItems='start'>
    <Text tag='label' id='color-filter-label' htmlFor='color-filter-trigger' size={200}>
      Color
    </Text>
    <Select>
      <Select.Trigger tag={FilterTrigger} id='color-filter-trigger' />
      <Select.Menu aria-labelledby='color-filter-label'>
        {colors.map((option, idx) => (
          <Select.Option key={idx} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select.Menu>
    </Select>
  </Flex>
);

const colors = ['Blue', 'Gray', 'Green', 'Orange', 'Pink', 'Red', 'Salad', 'Violet', 'Yellow'];

export default Demo;
