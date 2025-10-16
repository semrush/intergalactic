import { FilterTrigger } from '@semcore/ui/base-trigger';
import type { FilterTriggerProps, BaseTriggerProps } from '@semcore/ui/base-trigger';
import Dropdown from '@semcore/ui/dropdown';
import { Flex } from '@semcore/ui/flex-box';
import ChevronDownM from '@semcore/ui/icon/ChevronDown/m';
import Select from '@semcore/ui/select';
import React from 'react';

type FilterTriggerSelectDDMenuExample = FilterTriggerProps & BaseTriggerProps;
const Demo = (props: FilterTriggerSelectDDMenuExample) => (
  <Flex direction='column' gap={3}>
    <Flex gap={2} justifyContent='flex-start'>
      <Select
        tag={FilterTrigger}
        options={devices}
        data-test-id='base-trigger-as-tag-in-select'
        aria-label='base addon'
        size={props.size}
        state={props.state}
        active={props.active}
        empty={props.empty}
        placeholder={props.placeholder}
        disabled={props.disabled}
      >
        Select
      </Select>
    </Flex>
  </Flex>
);

const devices = ['Desktop', 'Mobile', 'Tablet'].map((item) => ({
  value: item,
  children: item,
}));

export const filterTriggerSelectDDMenuExampleProps: FilterTriggerSelectDDMenuExample = {
  size: 'm',
  state: undefined,
  active: undefined,
  empty: undefined,
  placeholder: undefined,
  disabled: undefined,
};

Demo.defaultProps = filterTriggerSelectDDMenuExampleProps;

export default Demo;
