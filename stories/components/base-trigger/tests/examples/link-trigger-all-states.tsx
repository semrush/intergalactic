import React from 'react';
import Select from '@semcore/select';
import Dropdown from '@semcore/dropdown';
import {LinkTrigger} from '@semcore/base-trigger';
import { Flex, Box } from '@semcore/flex-box';
import Spin from '@semcore/ui/spin';
import NeighborLocation from '@semcore/neighbor-location';
import ChevronDownM from '@semcore/icon/ChevronDown/m';
import CheckM from '@semcore/icon/Check/m';


const Demo = () => (
  <Flex direction='column' gap={3}>
    <Flex gap={2} wrap>
      <LinkTrigger chevron active data-test-id = 'active'>Active</LinkTrigger>
      <LinkTrigger disabled  data-test-id = 'disabled'>Disabled</LinkTrigger>
    </Flex>

    <Flex gap={2} wrap>
      <LinkTrigger color="red" data-test-id = 'normal-state'>Normal state</LinkTrigger>
      <LinkTrigger loading color='text-success' data-test-id = 'valid-state'>Valid state</LinkTrigger>
      <LinkTrigger loading color='blue' data-test-id = 'valid-state'></LinkTrigger>

    </Flex>


    <Flex gap={2} wrap>


    <LinkTrigger loading aria-label='base trigger' data-test-id = 'with-text-and-addon'>
      <LinkTrigger.Text>Base trigger.Text</LinkTrigger.Text>
     
    </LinkTrigger>

    <LinkTrigger aria-label='base trigger' data-test-id = 'with-text-and-addon'>
    <LinkTrigger.Addon tag={Spin} size='xs' />
      <LinkTrigger.Text>Base trigger.Text</LinkTrigger.Text>
     
    </LinkTrigger>

    <LinkTrigger aria-label='base trigger' data-test-id = 'with-text-and-addon'>
    <LinkTrigger.Addon>
          <CheckM />
        </LinkTrigger.Addon>
      <LinkTrigger.Text>Base trigger.Text</LinkTrigger.Text>
     
    </LinkTrigger>

    </Flex>
    <Flex gap={2} wrap>
    
    <Dropdown>
      <Dropdown.Trigger>
        <LinkTrigger aria-label='base trigger with dropdown'  data-test-id = 'base-tigger-in-dropdown'>
          <LinkTrigger.Text>LinkTrigger with dropdown</LinkTrigger.Text>
        </LinkTrigger>
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
