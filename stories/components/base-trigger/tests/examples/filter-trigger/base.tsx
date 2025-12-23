import { Flex } from '@semcore/ui/base-components';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import type { FilterTriggerProps, BaseTriggerProps } from '@semcore/ui/base-trigger';
import Tooltip from '@semcore/ui/tooltip';
import React from 'react';

type FilterTriggerBaseExample = FilterTriggerProps & BaseTriggerProps;
const Demo = (props: FilterTriggerBaseExample) => (
  <Flex direction='column' gap={3}>
    <FilterTrigger
      w={150}
      size={props.size}
      state={props.state}
      active={props.active}
      empty={props.empty}
      placeholder={props.placeholder}
      disabled={props.disabled}
      data-test-id='active-trigger'
    >
      Button Trigger
    </FilterTrigger>

    <FilterTrigger
      w={150}
      size={props.size}
      state={props.state}
      active={props.active}
      empty={props.empty}
      placeholder={props.placeholder}
      disabled={props.disabled}
    >
      <FilterTrigger.TriggerButton>Clear Text</FilterTrigger.TriggerButton>
      <Tooltip title='Clear tooltip'>
        <FilterTrigger.ClearButton data-test-id='tooltip-hint-text' />
      </Tooltip>
    </FilterTrigger>

  </Flex>
);

export const filterTriggerBaseExampleProps: FilterTriggerBaseExample = {
  size: 'm',
  state: undefined,
  active: undefined,
  empty: undefined,
  placeholder: undefined,
  disabled: undefined,
};

Demo.defaultProps = filterTriggerBaseExampleProps;

export default Demo;
