import ChevronDownM from '@semcore/icon/ChevronDown/m';
import { Flex } from '@semcore/ui/base-components';
import BaseTrigger from '@semcore/ui/base-trigger';
import type { BaseTriggerProps } from '@semcore/ui/base-trigger';
import Dropdown from '@semcore/ui/dropdown';
import Select from '@semcore/ui/select';
import React from 'react';

type BaseTriggerSelectDDMenuExample = BaseTriggerProps;
const Demo = (props: BaseTriggerSelectDDMenuExample) => (
  <Flex direction='column' gap={3}>
    <Flex gap={2} justifyContent='flex-start'>
      <Select
        tag={BaseTrigger}
        options={devices}
        data-test-id='base-trigger-as-tag-in-select'
        aria-label='base addon'
        size={props.size}
        state={props.state}
        active={props.active}
        empty={props.empty}
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
      <Dropdown>
        <Dropdown.Trigger>
          <BaseTrigger
            aria-label='base trigger with dropdown'
            data-test-id='base-trigger-in-dropdown'
            size={props.size}
            state={props.state}
            active={props.active}
            empty={props.empty}
            placeholder={props.placeholder}
            disabled={props.disabled}
          >
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

export const baseTriggerSelectDDMenuExampleProps: BaseTriggerSelectDDMenuExample = {
  size: 'm',
  state: undefined,
  active: undefined,
  empty: undefined,
  placeholder: undefined,
  disabled: undefined,

};

Demo.defaultProps = baseTriggerSelectDDMenuExampleProps;

export default Demo;
