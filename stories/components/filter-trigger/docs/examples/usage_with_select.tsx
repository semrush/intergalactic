import { Flex } from '@semcore/ui/base-components';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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
