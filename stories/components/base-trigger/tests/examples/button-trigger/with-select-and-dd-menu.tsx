import ChevronDownM from '@semcore/icon/ChevronDown/m';
import { Flex } from '@semcore/ui/base-components';
import { ButtonTrigger } from '@semcore/ui/base-trigger';
import type { ButtonTriggerProps, BaseTriggerProps } from '@semcore/ui/base-trigger';
import Dropdown from '@semcore/ui/dropdown';
import Select from '@semcore/ui/select';
import React from 'react';

type ButtonTriggerSelectDDMenuExample = ButtonTriggerProps & BaseTriggerProps;
const Demo = (props: ButtonTriggerSelectDDMenuExample) => (
  <Flex direction='column' gap={3}>
    <Flex gap={2} justifyContent='flex-start'>
      <Select
        tag={ButtonTrigger}
        options={devices}
        data-test-id='base-trigger-as-tag-in-select'
        aria-label='base addon'
        size={props.size}
        state={props.state}
        active={props.active}
        empty={props.empty}
        placeholder={props.placeholder}
        disabled={props.disabled}
        loading={props.loading}
        chevron={props.chevron}
      />
      <Dropdown>
        <Dropdown.Trigger>
          <ButtonTrigger
            aria-label='base trigger with dropdown'
            data-test-id='base-trigger-in-dropdown'
            size={props.size}
            state={props.state}
            active={props.active}
            empty={props.empty}
            placeholder={props.placeholder}
            disabled={props.disabled}
            loading={props.loading}
            chevron={props.chevron}
          >
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

export const buttonTriggerSelectDDMenuExampleProps: ButtonTriggerSelectDDMenuExample = {
  size: 'm',
  state: undefined,
  active: undefined,
  empty: undefined,
  placeholder: undefined,
  disabled: undefined,
  loading: undefined,
  chevron: undefined,
};

Demo.defaultProps = buttonTriggerSelectDDMenuExampleProps;

export default Demo;
