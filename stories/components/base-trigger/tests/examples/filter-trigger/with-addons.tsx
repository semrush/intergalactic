import ThumbUpM from '@semcore/icon/ThumbUp/m';
import { Flex } from '@semcore/ui/base-components';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import type { FilterTriggerProps, BaseTriggerProps } from '@semcore/ui/base-trigger';
import React from 'react';

type FilterTriggerWithAddonExample = FilterTriggerProps & BaseTriggerProps;
const Demo = (props: FilterTriggerWithAddonExample) => (
  <Flex gap={2} justifyContent='flex-start'>
    <FilterTrigger
      aria-label='base addon'
      data-test-id='addon-trigger'
      size={props.size}
      state={props.state}
      active={props.active}
      empty={props.empty}
      placeholder={props.placeholder}
      disabled={props.disabled}
    >
      <FilterTrigger.Addon tag={ThumbUpM} />
    </FilterTrigger>
    <FilterTrigger
      aria-label='base trigger'
      data-test-id='text-addon-trigger'
      size={props.size}
      state={props.state}
      active={props.active}
      empty={props.empty}
      placeholder={props.placeholder}
      disabled={props.disabled}
    >
      <FilterTrigger.Addon><ThumbUpM /></FilterTrigger.Addon>
      <FilterTrigger.Text>Text</FilterTrigger.Text>
    </FilterTrigger>
  </Flex>
);

export const filterTriggerWithAddonExampleProps: FilterTriggerWithAddonExample = {
  size: 'm',
  state: undefined,
  active: undefined,
  empty: undefined,
  placeholder: undefined,
  disabled: undefined,
};

Demo.defaultProps = filterTriggerWithAddonExampleProps;

export default Demo;
