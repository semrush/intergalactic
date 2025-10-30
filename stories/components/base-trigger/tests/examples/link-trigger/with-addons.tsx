import { LinkTrigger } from '@semcore/ui/base-trigger';
import type { LinkTriggerProps, BaseTriggerProps } from '@semcore/ui/base-trigger';
import { Flex } from '@semcore/ui/flex-box';
import ThumbUpM from '@semcore/ui/icon/ThumbUp/m';
import React from 'react';

type LinkTriggerWithAddonExample = LinkTriggerProps & BaseTriggerProps;
const Demo = (props: LinkTriggerWithAddonExample) => (
  <Flex gap={2} justifyContent='flex-start'>
    <LinkTrigger
      aria-label='base addon'
      data-test-id='addon-trigger'
      size={props.size}
      state={props.state}
      active={props.active}
      empty={props.empty}
      placeholder={props.placeholder}
      disabled={props.disabled}
      loading={props.loading}
      color={props.color}
    >
      <LinkTrigger.Addon tag={ThumbUpM} />
    </LinkTrigger>
    <LinkTrigger
      aria-label='base trigger'
      data-test-id='text-addon-trigger'
      size={props.size}
      state={props.state}
      active={props.active}
      empty={props.empty}
      placeholder={props.placeholder}
      disabled={props.disabled}
      loading={props.loading}
      color={props.color}
    >
      <LinkTrigger.Addon><ThumbUpM /></LinkTrigger.Addon>
      <LinkTrigger.Text>Text</LinkTrigger.Text>
    </LinkTrigger>
  </Flex>
);

export const linkTriggerWithAddonExampleProps: LinkTriggerWithAddonExample = {
  size: 'm',
  state: undefined,
  active: undefined,
  empty: undefined,
  placeholder: undefined,
  disabled: undefined,
  loading: undefined,
  color: undefined,
};

Demo.defaultProps = linkTriggerWithAddonExampleProps;

export default Demo;
