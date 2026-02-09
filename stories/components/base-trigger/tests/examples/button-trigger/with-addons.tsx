import ThumbUpM from '@semcore/icon/ThumbUp/m';
import { Flex } from '@semcore/ui/base-components';
import { ButtonTrigger } from '@semcore/ui/base-trigger';
import type { ButtonTriggerProps, BaseTriggerProps } from '@semcore/ui/base-trigger';
import React from 'react';

type ButtonTriggerWithAddonExample = ButtonTriggerProps & BaseTriggerProps;
const Demo = (props: ButtonTriggerWithAddonExample) => (
  <Flex gap={2} justifyContent='flex-start'>
    <ButtonTrigger
      aria-label='base addon'
      data-test-id='addon-trigger'
      size={props.size}
      state={props.state}
      active={props.active}
      empty={props.empty}
      placeholder={props.placeholder}
      disabled={props.disabled}
      loading={props.loading}
      chevron={props.chevron}
    >
      <ButtonTrigger.Addon tag={ThumbUpM} />
    </ButtonTrigger>
    <ButtonTrigger
      aria-label='base trigger'
      data-test-id='text-addon-trigger'
      size={props.size}
      state={props.state}
      active={props.active}
      empty={props.empty}
      placeholder={props.placeholder}
      disabled={props.disabled}
      loading={props.loading}
      chevron={props.chevron}
    >
      <ButtonTrigger.Addon><ThumbUpM /></ButtonTrigger.Addon>
      <ButtonTrigger.Text>Text</ButtonTrigger.Text>
    </ButtonTrigger>
  </Flex>
);

export const buttonTriggerWithAddonExampleProps: ButtonTriggerWithAddonExample = {
  size: 'm',
  state: undefined,
  active: undefined,
  empty: undefined,
  placeholder: undefined,
  disabled: undefined,
  loading: undefined,
  chevron: undefined,
};

Demo.defaultProps = buttonTriggerWithAddonExampleProps;

export default Demo;
