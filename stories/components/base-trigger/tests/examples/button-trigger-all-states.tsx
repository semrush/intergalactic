import React from 'react';
import Select from '@semcore/select';
import Dropdown from '@semcore/dropdown';
import {ButtonTrigger} from '@semcore/base-trigger';
import { Flex, Box } from '@semcore/flex-box';
import Spin from '@semcore/ui/spin';
import NeighborLocation from '@semcore/neighbor-location';
import ChevronDownM from '@semcore/icon/ChevronDown/m';

const Demo = () => (
  <Flex direction='column' gap={3}>
    <Flex gap={2} wrap>
      <ButtonTrigger active data-test-id = 'active'>Active</ButtonTrigger>
      <ButtonTrigger disabled  data-test-id = 'disabled'>Disabled</ButtonTrigger>
    </Flex>

    <Flex gap={2} wrap>
      <ButtonTrigger state='normal' data-test-id = 'normal-state'>Normal state</ButtonTrigger>
      <ButtonTrigger state='valid' data-test-id = 'valid-state'>Valid state</ButtonTrigger>
      <ButtonTrigger state='invalid' data-test-id = 'invalid-state'>Invalid state</ButtonTrigger>
    </Flex>

    <Flex gap={2} wrap>
      <ButtonTrigger theme='normal' data-test-id = 'normal-theme'>Normal theme</ButtonTrigger>
      <ButtonTrigger theme='valid'  data-test-id = 'valid-theme'>Valid theme</ButtonTrigger>
      <ButtonTrigger theme='invalid'  data-test-id = 'invalid-theme'>Invalid theme</ButtonTrigger>
    </Flex>

    <Flex gap={2} wrap>
      <ButtonTrigger size='m'  data-test-id = 'm-size'>ButtonM</ButtonTrigger>
      <ButtonTrigger size='l' data-test-id = 'l-size'>ButtonL</ButtonTrigger>
    </Flex>

    <Flex gap={2} wrap>
    <NeighborLocation>
      <ButtonTrigger data-test-id = 'left-location'>Left</ButtonTrigger>
      <ButtonTrigger data-test-id = 'center-location'>Center</ButtonTrigger>
      <ButtonTrigger data-test-id = 'right-location'>Right</ButtonTrigger>
    </NeighborLocation>

    <ButtonTrigger empty placeholder='placeholder' data-test-id = 'placeholder'>
      Button with placeholder
    </ButtonTrigger>

    <ButtonTrigger aria-label='base trigger' data-test-id = 'with-text-and-addon'>
      <ButtonTrigger.Text>Base trigger.Text</ButtonTrigger.Text>
      <ButtonTrigger.Addon tag={Spin} size='xs' />
    </ButtonTrigger>

    </Flex>
    <Flex gap={2} wrap>
    <Select active tag={ButtonTrigger} options={devices} data-test-id = 'base-tigger-as-tag-in-select' />

    <Dropdown>
      <Dropdown.Trigger>
        <ButtonTrigger aria-label='base trigger with dropdown'  data-test-id = 'base-tigger-in-dropdown'>
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
