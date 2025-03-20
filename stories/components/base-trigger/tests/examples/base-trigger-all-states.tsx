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
    <Flex gap={2} wrap justifyContent='flex-start'>
      <BaseTrigger active data-test-id='active-trigger'>Active</BaseTrigger>
      <BaseTrigger disabled data-test-id='disabled-trigger'>Disabled</BaseTrigger>
    </Flex>
    <Flex gap={2} wrap justifyContent='flex-start'>
      <BaseTrigger state='normal' data-test-id='normal-state-trigger'>Normal state</BaseTrigger>
      <BaseTrigger state='valid' data-test-id='valid-state-trigger'>Valid state</BaseTrigger>
      <BaseTrigger state='invalid' data-test-id='invalid-state-trigger'>Invalid state</BaseTrigger>
    </Flex>
    <Flex gap={2} wrap justifyContent='flex-start'>
      <BaseTrigger theme='normal' data-test-id='normal-theme-trigger'>Normal theme</BaseTrigger>
      <BaseTrigger theme='valid' data-test-id='valid-theme-trigger'>Valid theme</BaseTrigger>
      <BaseTrigger theme='invalid' data-test-id='invalid-theme-trigger'>Invalid theme</BaseTrigger>
    </Flex>
    <Flex gap={2} wrap justifyContent='flex-start'>
      <BaseTrigger size='m' data-test-id='m-size-trigger'>ButtonM</BaseTrigger>
      <BaseTrigger size='l' data-test-id='l-size-trigger'>ButtonL</BaseTrigger>
      <NeighborLocation>
        <BaseTrigger data-test-id='left-location-trigger'>Left</BaseTrigger>
        <BaseTrigger data-test-id='center-location-trigger'>Center</BaseTrigger>
        <BaseTrigger data-test-id='right-location-trigger'>Right</BaseTrigger>
      </NeighborLocation>
    </Flex>
    <Flex gap={2} wrap justifyContent='flex-start'>
      <BaseTrigger empty placeholder='Placeholder' theme='normal' data-test-id='placeholder-trigger-normal'>Button with placeholder</BaseTrigger>
      <BaseTrigger empty active placeholder='Placeholder' theme='active' data-test-id='placeholder-trigger-active'>Button with placeholder</BaseTrigger>
      <BaseTrigger empty theme='invalid' placeholder='Placeholder' data-test-id='placeholder-trigger-invalid'>Button with placeholder</BaseTrigger>
    </Flex>
    <Flex gap={2} wrap justifyContent='flex-start'>
      <BaseTrigger empty theme='valid' placeholder='Placeholder' data-test-id='placeholder-trigger-valid'>Button with placeholder</BaseTrigger>
      <BaseTrigger empty disabled placeholder='Placeholder' data-test-id='placeholder-trigger-disabled'>Button with placeholder</BaseTrigger>
      <BaseTrigger empty state='valid' placeholder='Placeholder' data-test-id='placeholder-trigger-state-valid'>Button with placeholder</BaseTrigger>
      <BaseTrigger empty state='invalid' placeholder='Placeholder' data-test-id='placeholder-trigger-state-invalid'>Button with placeholder</BaseTrigger>
    </Flex>
    <Flex gap={2} wrap justifyContent='flex-start'>
      <BaseTrigger aria-label='base trigger' data-test-id='text-addon-trigger-1'>
        <BaseTrigger.Text>Base trigger.Text</BaseTrigger.Text>
        <BaseTrigger.Addon tag={Spin} size='xs' />
      </BaseTrigger>
      <BaseTrigger aria-label='base trigger' disabled data-test-id='text-addon-trigger-2'>
        <BaseTrigger.Text>Base trigger.Text</BaseTrigger.Text>
        <BaseTrigger.Addon tag={Spin} size='xs' />
      </BaseTrigger>
    </Flex>
    <Flex gap={2} wrap justifyContent='flex-start'>
      <Select tag={BaseTrigger} options={devices} data-test-id='base-trigger-as-tag-in-select' />
      <Dropdown>
        <Dropdown.Trigger>
          <BaseTrigger aria-label='base trigger with dropdown' data-test-id='base-trigger-in-dropdown'>
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
