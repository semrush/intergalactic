import { Flex } from '@semcore/ui/base-components';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const options: { value: number; label: string; children: string }[] = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Option ${index}`,
    children: `Option ${index}`,
  }));

const Demo = () => {
  return (
    <>
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='basic-select'>
          Basic select
        </Text>
        <Select
          mt={2}
          mr='auto'
          options={options}
          placeholder='Select option'
          id='basic-select'
          interaction='focus'
        />
      </Flex>
    </>
  );
};

export default Demo;
