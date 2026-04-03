import ThumbUpM from '@semcore/icon/ThumbUp/m';
import { Flex } from '@semcore/ui/base-components';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import type { LinkTriggerProps } from '@semcore/ui/base-trigger';
import React from 'react';

type LinkTriggerWithAddonExample = LinkTriggerProps;
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
  size: 300,
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
