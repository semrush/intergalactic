import { ButtonTrigger } from '@semcore/ui/base-trigger';
import Dropdown from '@semcore/ui/dropdown';
import { Flex } from '@semcore/ui/flex-box';
import ChevronDownM from '@semcore/ui/icon/ChevronDown/m';
import NeighborLocation from '@semcore/ui/neighbor-location';
import Select from '@semcore/ui/select';
import React from 'react';

const Demo = () => (
  <Flex direction='column' gap={3}>
    <Flex gap={2} justifyContent='flex-start'>
      <ButtonTrigger active data-test-id='active-trigger'>Active</ButtonTrigger>
      <ButtonTrigger disabled data-test-id='disabled-trigger'>Disabled</ButtonTrigger>
    </Flex>
    <Flex gap={2} justifyContent='flex-start'>
      <ButtonTrigger state='normal' data-test-id='normal-state-trigger'>Normal state</ButtonTrigger>
      <ButtonTrigger state='valid' data-test-id='valid-state-trigger'>Valid state</ButtonTrigger>
      <ButtonTrigger state='invalid' data-test-id='invalid-state-trigger'>Invalid state</ButtonTrigger>
    </Flex>
    <Flex gap={2} justifyContent='flex-start'>
      <ButtonTrigger size='m' data-test-id='m-size-trigger' chevron={false}>ButtonM</ButtonTrigger>
      <ButtonTrigger size='l' data-test-id='l-size-trigger'>ButtonL</ButtonTrigger>
      <NeighborLocation>
        <ButtonTrigger data-test-id='left-location-trigger'>Left</ButtonTrigger>
        <ButtonTrigger data-test-id='center-location-trigger' chevron={false}>Center</ButtonTrigger>
        <ButtonTrigger data-test-id='right-location-trigger'>Right</ButtonTrigger>
      </NeighborLocation>
    </Flex>
    <Flex gap={2} justifyContent='flex-start'>
      <ButtonTrigger empty disabled placeholder='Placeholder' data-test-id='placeholder-trigger-disabled' chevron={false}>Button with placeholder</ButtonTrigger>
      <ButtonTrigger empty state='valid' placeholder='Placeholder' data-test-id='placeholder-trigger-state-valid'>Button with placeholder</ButtonTrigger>
      <ButtonTrigger empty state='invalid' placeholder='Placeholder' data-test-id='placeholder-trigger-state-invalid'>Button with placeholder</ButtonTrigger>
    </Flex>
    <Flex gap={2} justifyContent='flex-start'>
      <ButtonTrigger aria-label='base trigger' data-test-id='text-addon-trigger-1'>
        <ButtonTrigger.Addon tag={ChevronDownM} />
        <ButtonTrigger.Text>Base trigger.Text</ButtonTrigger.Text>

      </ButtonTrigger>
      <ButtonTrigger aria-label='base trigger' disabled data-test-id='text-addon-trigger-2'>
        <ButtonTrigger.Addon tag={ChevronDownM} />
        <ButtonTrigger.Text>Base trigger.Text</ButtonTrigger.Text>
      </ButtonTrigger>
    </Flex>
    <Flex gap={2} justifyContent='flex-start'>
      <Select tag={ButtonTrigger} options={devices} data-test-id='base-trigger-as-tag-in-select' />
      <Dropdown>
        <Dropdown.Trigger>
          <ButtonTrigger aria-label='base trigger with dropdown' data-test-id='base-trigger-in-dropdown'>
            <ButtonTrigger.Text>ButtonTrigger with dropdown</ButtonTrigger.Text>
            <ButtonTrigger.Addon>
              <ChevronDownM />
            </ButtonTrigger.Addon>
          </ButtonTrigger>
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
