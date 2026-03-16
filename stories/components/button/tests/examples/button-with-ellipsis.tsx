import type { EllipsisSettings, SimpleHintPopperProps } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import type { ButtonProps } from '@semcore/ui/button';
import React from 'react';

type ButtonEllipsisProps = ButtonProps & {
  ellipsis?: true | EllipsisSettings;
  w?: number | string;
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
};

const Demo = (props: ButtonEllipsisProps) => {
  return (
    <>
      <Button
        size={props.size}
        use={props.use}
        theme={props.theme}
        active={props.active}
        disabled={props.disabled}
        loading={props.loading}
      >
        <Button.Text
          ellipsis={props.ellipsis}
          w={props.w}
          hint:placement={props.hintPlacement}
        >
          Button with very long text that should be truncated with ellipsis
        </Button.Text>
      </Button>

      <Button
        ml={2}
        size={props.size}
        use={props.use}
        theme={props.theme}
        active={props.active}
        disabled={props.disabled}
        loading={props.loading}
      >
        <Button.Text>
          Button without ellipsis
        </Button.Text>
      </Button>
    </>
  );
};

export const defaultButtonEllipsisProps: ButtonEllipsisProps = {
  ellipsis: true,
  w: 120,
  size: 'm',
  use: 'secondary',
};

Demo.defaultProps = defaultButtonEllipsisProps;
export default Demo;
