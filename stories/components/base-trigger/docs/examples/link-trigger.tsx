import { Flex } from '@semcore/ui/base-components';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <Flex gap={2}>
      <Text size={200} tag='label' htmlFor='device-link-select'>
        Device:
      </Text>
      <Select tag={LinkTrigger} options={devices} id='device-link-select' />
      <Select
        tag={LinkTrigger}
        options={periods}
        aria-label='Period'
        placeholder='Select period'
        ml={4}
      />
    </Flex>
  );
};

const devices = ['Desktop', 'Mobile', 'Tablet'].map((item) => ({
  value: item,
  children: item,
}));

const periods = ['Last week', 'Last month', 'Last 6 months'].map((item) => ({
  value: item,
  children: item,
}));

export default Demo;
