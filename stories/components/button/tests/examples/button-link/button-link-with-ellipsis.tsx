import type { EllipsisSettings, SimpleHintPopperProps } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import type { ButtonLinkProps } from '@semcore/ui/button';
import React from 'react';

type ButtonLinkEllipsisProps = ButtonLinkProps & {
  ellipsis?: true | EllipsisSettings;
  w?: number | string;
  color?: string;
  enableHintTriggerRef?: boolean;
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
  hintProps?: SimpleHintPopperProps;
  style?: any;
};

const Demo = (props: ButtonLinkEllipsisProps) => {
  const linkRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <ButtonLink
        size={props.size}
        use={props.use}
        active={props.active}
        disabled={props.disabled}
        color={props.color}
        ref={linkRef}
        style={props.style}
      >
        <ButtonLink.Text
          ellipsis={props.ellipsis}
          w={props.w}
          hintProps={{
            ...(props.enableHintTriggerRef ? { triggerRef: linkRef } : {}),
            ...(props.hintPlacement ? { placement: props.hintPlacement } : {}),
            ...props.hintProps,
          }}
        >
          ButtonLink with very long text that should be truncated with ellipsis
        </ButtonLink.Text>
      </ButtonLink>

      <ButtonLink
        ml={2}
        size={props.size}
        use={props.use}
        active={props.active}
        disabled={props.disabled}
        color={props.color}
        ref={linkRef}
        style={props.style}
      >
        <ButtonLink.Text
          w='100%'

        >
          ButtonLink without ellipsis props
        </ButtonLink.Text>
      </ButtonLink>

    </>
  );
};

export const defaultButtonLinkEllipsisProps: ButtonLinkEllipsisProps = {
  ellipsis: true,
  w: 120,
  size: 100,
  use: 'primary',
  color: undefined,
  active: undefined,
  disabled: undefined,
  enableHintTriggerRef: undefined,
  hintPlacement: undefined,
  hintProps: undefined,
  style: undefined,
};

Demo.defaultProps = defaultButtonLinkEllipsisProps;
export default Demo;
