import type { EllipsisSettings, SimpleHintPopperProps } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import type { ButtonProps } from '@semcore/ui/button';
import React from 'react';

type ButtonEllipsisProps = ButtonProps & {
  ellipsis?: true | EllipsisSettings;
  w?: number | string;
  enableHintTriggerRef?: boolean;
  hintProps?: SimpleHintPopperProps;
  style?: any;
};

const Demo = (props: ButtonEllipsisProps) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Button
      size={props.size}
      use={props.use}
      theme={props.theme}
      active={props.active}
      disabled={props.disabled}
      loading={props.loading}
      ref={buttonRef}
      style={props.style}
    >
      <Button.Text
        ellipsis={props.ellipsis}
        w={props.w}
        hintProps={
          props.enableHintTriggerRef
            ? { triggerRef: buttonRef, ...props.hintProps }
            : props.hintProps
        }
      >
        Button with very long text that should be truncated with ellipsis
      </Button.Text>
    </Button>
  );
};

export const defaultButtonEllipsisProps: ButtonEllipsisProps = {
  ellipsis: true,
  w: 120,
  size: 'm',
  use: 'secondary',
  theme: undefined,
  active: undefined,
  disabled: undefined,
  loading: undefined,
  enableHintTriggerRef: undefined,
  hintProps: undefined,
  style: undefined,
};

Demo.defaultProps = defaultButtonEllipsisProps;
export default Demo;
