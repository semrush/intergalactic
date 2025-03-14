import React from 'react';
import { Flex } from '@semcore/flex-box';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';

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
