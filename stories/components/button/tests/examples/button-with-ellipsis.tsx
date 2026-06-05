import type { NSText } from '@semcore/typography';
import Button from '@semcore/ui/button';
import type { ButtonProps } from '@semcore/ui/button';
import React from 'react';

import { themeFor } from '../themeUtils';

type ButtonEllipsisProps = ButtonProps & {
  ellipsis?: NSText.EllipsisProps;
  w?: number | string;
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
  hintProps?: false;

};

const Demo = (props: ButtonEllipsisProps) => {
  const theme = themeFor(props);

  return (
    <>
      <Button
        size={props.size}
        use={props.use}
        theme={theme}
        active={props.active}
        disabled={props.disabled}
        loading={props.loading}
      >
        <Button.Text
          {...props.ellipsis}
          w={props.w}
          hint:placement={props.hintPlacement}
          hint={props.hintProps}
        >
          Button with very long text that should be truncated with ellipsis
        </Button.Text>
      </Button>

      <Button
        ml={2}
        size={props.size}
        use={props.use}
        theme={theme}
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
  ellipsis: { ellipsis: true },
  w: 120,
  size: 'm',
  use: 'secondary',
};

Demo.defaultProps = defaultButtonEllipsisProps;
export default Demo;
