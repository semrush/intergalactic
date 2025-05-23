import React from 'react';
import Select from '@semcore/select';
import { LinkTrigger } from '@semcore/base-trigger';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => (
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

const devices = ['Desktop', 'Mobile', 'Tablet'].map((item) => ({
  value: item,
  children: item,
}));

const periods = ['Last week', 'Last month', 'Last 6 months'].map((item) => ({
  value: item,
  children: item,
}));

export default Demo;
