import ThumbUpM from '@semcore/icon/ThumbUp/m';
import { Flex } from '@semcore/ui/base-components';
import BaseTrigger from '@semcore/ui/base-trigger';
import type { BaseTriggerProps } from '@semcore/ui/base-trigger';
import React from 'react';

type BaseTriggerWithAddonExample = BaseTriggerProps;
const Demo = (props: BaseTriggerWithAddonExample) => (
  <Flex gap={2} justifyContent='flex-start'>
    <BaseTrigger
      aria-label='base addon'
      data-test-id='addon-trigger'
      size={props.size}
      state={props.state}
      active={props.active}
      empty={props.empty}
      placeholder={props.placeholder}
      disabled={props.disabled}
    >
      <BaseTrigger.Addon tag={ThumbUpM} />
    </BaseTrigger>
    <BaseTrigger
      aria-label='base trigger'
      data-test-id='text-addon-trigger'
      size={props.size}
      state={props.state}
      active={props.active}
      empty={props.empty}
      placeholder={props.placeholder}
      disabled={props.disabled}
    >
      <BaseTrigger.Addon><ThumbUpM /></BaseTrigger.Addon>
      <BaseTrigger.Text>Text</BaseTrigger.Text>
    </BaseTrigger>
  </Flex>
);

export const baseTriggerWithAddonExampleProps: BaseTriggerWithAddonExample = {
  size: 'm',
  state: undefined,
  active: undefined,
  empty: undefined,
  placeholder: undefined,
  disabled: undefined,
};

Demo.defaultProps = baseTriggerWithAddonExampleProps;

export default Demo;
