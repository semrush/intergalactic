import { LinkTrigger } from '@semcore/ui/base-trigger';
import type { LinkTriggerProps, BaseTriggerProps } from '@semcore/ui/base-trigger';
import React from 'react';

type LinkTriggerBaseExample = LinkTriggerProps & BaseTriggerProps;
const Demo = (props: LinkTriggerBaseExample) => (
  <>
    <LinkTrigger
      size={props.size}
      state={props.state}
      active={props.active}
      empty={props.empty}
      placeholder={props.placeholder}
      disabled={props.disabled}
      loading={props.loading}
      data-test-id='active-trigger'
      color={props.color}
    >
      Link Trigger
    </LinkTrigger>
  </>
);

export const linkTriggerBaseExampleProps: LinkTriggerBaseExample = {
  size: 'm',
  state: undefined,
  active: undefined,
  empty: undefined,
  placeholder: undefined,
  disabled: undefined,
  loading: undefined,
  color: undefined,
};

Demo.defaultProps = linkTriggerBaseExampleProps;

export default Demo;
