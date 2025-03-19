import React from 'react';
import Select from '@semcore/select';
import Dropdown from '@semcore/dropdown';
import BaseTrigger from '@semcore/base-trigger';
import { Flex, Box } from '@semcore/flex-box';
import Spin from '@semcore/ui/spin';
import NeighborLocation from '@semcore/neighbor-location';
import ChevronDownM from '@semcore/icon/ChevronDown/m';

const Demo = () => (
  <Flex direction='column' gap={3}>
    <Flex gap={2} wrap>
      <BaseTrigger active data-test-id = 'active'>Active</BaseTrigger>
      <BaseTrigger disabled  data-test-id = 'disabled'>Disabled</BaseTrigger>
    </Flex>

    <Flex gap={2} wrap>
      <BaseTrigger state='normal' data-test-id = 'normal-state'>Normal state</BaseTrigger>
      <BaseTrigger state='valid' data-test-id = 'valid-state'>Valid state</BaseTrigger>
      <BaseTrigger state='invalid' data-test-id = 'invalid-state'>Invalid state</BaseTrigger>
    </Flex>

    <Flex gap={2} wrap>
      <BaseTrigger theme='normal' data-test-id = 'normal-theme'>Normal theme</BaseTrigger>
      <BaseTrigger theme='valid'  data-test-id = 'valid-theme'>Valid theme</BaseTrigger>
      <BaseTrigger theme='invalid'  data-test-id = 'invalid-theme'>Invalid theme</BaseTrigger>
    </Flex>

    <Flex gap={2} wrap>
      <BaseTrigger size='m'  data-test-id = 'm-size'>ButtonM</BaseTrigger>
      <BaseTrigger size='l' data-test-id = 'l-size'>ButtonL</BaseTrigger>
    </Flex>

    <Flex gap={2} wrap>
    <NeighborLocation>
      <BaseTrigger data-test-id = 'left-location'>Left</BaseTrigger>
      <BaseTrigger data-test-id = 'center-location'>Center</BaseTrigger>
      <BaseTrigger data-test-id = 'right-location'>Right</BaseTrigger>
    </NeighborLocation>

    <BaseTrigger empty placeholder='placeholder' data-test-id = 'placeholder'>
      Button with placeholder
    </BaseTrigger>

    <BaseTrigger aria-label='base trigger' data-test-id = 'with-text-and-addon'>
      <BaseTrigger.Text>Base trigger.Text</BaseTrigger.Text>
      <BaseTrigger.Addon tag={Spin} size='xs' />
    </BaseTrigger>

    </Flex>
    <Flex gap={2} wrap>
    <Select active tag={BaseTrigger} options={devices} data-test-id = 'base-tigger-as-tag-in-select' />

    <Dropdown>
      <Dropdown.Trigger>
        <BaseTrigger aria-label='base trigger with dropdown'  data-test-id = 'base-tigger-in-dropdown'>
          <BaseTrigger.Text>BaseTrigger with dropdown</BaseTrigger.Text>
          <BaseTrigger.Addon>
            <ChevronDownM />
          </BaseTrigger.Addon>
        </BaseTrigger>
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
