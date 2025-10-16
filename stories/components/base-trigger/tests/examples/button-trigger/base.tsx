import { ButtonTrigger } from '@semcore/ui/base-trigger';
import type { ButtonTriggerProps, BaseTriggerProps } from '@semcore/ui/base-trigger';
import { Flex } from '@semcore/ui/flex-box';
import React from 'react';

type ButtonTriggerBaseExample = ButtonTriggerProps & BaseTriggerProps;
const Demo = (props: ButtonTriggerBaseExample) => (
  <Flex direction='column' gap={3}>
    <ButtonTrigger
      w={150}
      size={props.size}
      state={props.state}
      active={props.active}
      empty={props.empty}
      placeholder={props.placeholder}
      disabled={props.disabled}
      loading={props.loading}
      chevron={props.chevron}
      data-test-id='active-trigger'
    >
      Button Trigger
    </ButtonTrigger>

  </Flex>
);

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
