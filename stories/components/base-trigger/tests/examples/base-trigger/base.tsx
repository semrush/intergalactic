import { Flex } from '@semcore/ui/base-components';
import BaseTrigger from '@semcore/ui/base-trigger';
import type { BaseTriggerProps } from '@semcore/ui/base-trigger';
import React from 'react';

type BaseTriggerBaseExample = BaseTriggerProps;
const Demo = (props: BaseTriggerBaseExample) => (
  <Flex direction='column' gap={3}>
    <BaseTrigger
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
    </BaseTrigger>

  </Flex>
);

export const baseTriggerBaseExampleProps: BaseTriggerBaseExample = {
  size: 'm',
  state: undefined,
  active: undefined,
  empty: undefined,
  placeholder: undefined,
  disabled: undefined,
};

Demo.defaultProps = baseTriggerBaseExampleProps;

export default Demo;
