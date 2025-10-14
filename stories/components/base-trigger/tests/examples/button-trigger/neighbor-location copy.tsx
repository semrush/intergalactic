import { ButtonTrigger } from '@semcore/ui/base-trigger';
import type { ButtonTriggerProps, BaseTriggerProps } from '@semcore/ui/base-trigger';
import Dropdown from '@semcore/ui/dropdown';
import { Flex } from '@semcore/ui/flex-box';
import ChevronDownM from '@semcore/ui/icon/ChevronDown/m';
import NeighborLocation from '@semcore/ui/neighbor-location';
import Select from '@semcore/ui/select';
import React from 'react';

type ButtonTriggerExample = ButtonTriggerProps & BaseTriggerProps;
const Demo = (props: ButtonTriggerExample) => (
  <Flex direction='column' gap={3}>

    <Flex gap={2} justifyContent='flex-start'>
      <ButtonTrigger aria-label='base trigger' data-test-id='text-addon-trigger-1'>
        <ButtonTrigger.Addon tag={ChevronDownM} />
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

export const buttonTriggerBaseExampleProps: ButtonTriggerBaseExample = {
  size: 'm',
  state: undefined,
  active: undefined,
  empty: undefined,
  placeholder: undefined,
  disabled: undefined,
  loading: undefined,
  chevron: undefined,
};

Demo.defaultProps = buttonTriggerBaseExampleProps;

export default Demo;
