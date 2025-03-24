import React from 'react';
import Select from '@semcore/select';
import Dropdown from '@semcore/dropdown';
import Tooltip from '@semcore/tooltip';
import {FilterTrigger} from '@semcore/base-trigger';
import { Flex } from '@semcore/flex-box';
import ChevronDownM from '@semcore/icon/ChevronDown/m';


const Demo = () => (
  <Flex direction='column' gap={3}>
    <Flex gap={2}>
    <FilterTrigger empty={false}>
        <FilterTrigger.TriggerButton>Some button content</FilterTrigger.TriggerButton>
        <Tooltip title={'clear trigger hint text'}>
          <FilterTrigger.ClearButton data-test-id={'tooltip-hint-text'} />
        </Tooltip>
      </FilterTrigger>
      <FilterTrigger active data-test-id = 'active'>Active</FilterTrigger>
      <FilterTrigger  empty placeholder='placeholder'   data-test-id = 'placeholder'>Disabled</FilterTrigger>
      <FilterTrigger disabled  data-test-id = 'disabled'>Disabled</FilterTrigger>
    </Flex>


    <Flex gap={2}> 
      <FilterTrigger size='m'  data-test-id = 'm-size'>ButtonM</FilterTrigger>
      <FilterTrigger size='l' data-test-id = 'l-size'>ButtonL</FilterTrigger>
    </Flex>

    <Flex gap={2}>
    <FilterTrigger aria-label='filter trigger' data-test-id = 'with-text-and-addon'>
    <FilterTrigger.Addon tag={ChevronDownM} />
      <FilterTrigger.Text>Filter trigger Addons</FilterTrigger.Text>
      <FilterTrigger.Addon tag={ChevronDownM} />
    </FilterTrigger>

    </Flex>
    <Flex gap={2}>
    <Select active tag={FilterTrigger} options={devices} data-test-id = 'filter-tigger-as-tag-in-select' />

    <Dropdown>
      <Dropdown.Trigger>
        <FilterTrigger aria-label='filter trigger with dropdown'  data-test-id = 'filter-tigger-in-dropdown'>
          <FilterTrigger.Text>FilterTrigger  dropdown</FilterTrigger.Text>
          
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
