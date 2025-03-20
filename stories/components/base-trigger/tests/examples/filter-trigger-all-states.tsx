import React from 'react';
import Select from '@semcore/select';
import Dropdown from '@semcore/dropdown';
import {FilterTrigger} from '@semcore/base-trigger';
import { Flex, Box } from '@semcore/flex-box';
import Spin from '@semcore/ui/spin';
import NeighborLocation from '@semcore/neighbor-location';
import ChevronDownM from '@semcore/icon/ChevronDown/m';

const Demo = () => (
  <Flex direction='column' gap={3}>
    <Flex gap={2} wrap>
      <FilterTrigger active data-test-id = 'active'>Active</FilterTrigger>
      <FilterTrigger active empty placeholder='placeholder'   data-test-id = 'disabled'>Disabled</FilterTrigger>

      <FilterTrigger disabled  data-test-id = 'disabled'>Disabled</FilterTrigger>
      <FilterTrigger disabled empty placeholder='placeholder'   data-test-id = 'disabled'>Disabled</FilterTrigger>

    </Flex>


    <Flex gap={2} wrap>
    <FilterTrigger empty placeholder='placeholder' data-test-id = 'placeholder'>
      Button with placeholder
    </FilterTrigger>
    <FilterTrigger size='l' empty placeholder='placeholder' data-test-id = 'placeholder'>
      Button with placeholder
    </FilterTrigger>
      <FilterTrigger size='m'  data-test-id = 'm-size'>ButtonM</FilterTrigger>
      <FilterTrigger size='l' data-test-id = 'l-size'>ButtonL</FilterTrigger>
    </Flex>

    <Flex gap={2} wrap>

 

    <FilterTrigger aria-label='base trigger' data-test-id = 'with-text-and-addon'>
    <FilterTrigger.Addon tag={Spin} size='xs' />
      <FilterTrigger.Text>Base trigger.Text</FilterTrigger.Text>
      <FilterTrigger.Addon tag={Spin} size='xs' />
    </FilterTrigger>

    </Flex>
    <Flex gap={2} wrap>
    <Select active tag={FilterTrigger} options={devices} data-test-id = 'base-tigger-as-tag-in-select' />

    <Dropdown>
      <Dropdown.Trigger>
        <FilterTrigger aria-label='base trigger with dropdown'  data-test-id = 'base-tigger-in-dropdown'>
          <FilterTrigger.Text>FilterTrigger with dropdown</FilterTrigger.Text>
          
        </FilterTrigger>
      </Dropdown.Trigger>
    </Dropdown>
  </Flex>
  </Flex>
);

const devices = ['Desktop', 'Mobile', 'Tablet'].map((item) => ({
  value: item,
  children: item,
}));

export default Demo;
