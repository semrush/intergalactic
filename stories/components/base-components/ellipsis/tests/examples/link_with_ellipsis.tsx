import Link from '@semcore/ui/link';
import type { NSText } from '@semcore/ui/typography';
import React from 'react';

type LinkEllipsisProps = {
  ellipsis?: NSText.EllipsisProps;
  w?: number | string;
  color?: string;
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
  active?: boolean;
  disabled?: boolean;
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
  hintProps?: false;
};

const Demo = (props: LinkEllipsisProps) => {
  let linkDisplayValue: 'inline-block' | undefined;

  if (props.ellipsis?.['ellipsis:maxLine'] && props.ellipsis['ellipsis:maxLine'] > 1) {
    linkDisplayValue = 'inline-block';
  }

  return (
    <Link
      href='https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis'
      active={props.active}
      disabled={props.disabled}
      display={linkDisplayValue}
    >
      <Link.Text
        {...props.ellipsis}
        w={props.w}
        color={props.color}
        size={props.size}
        hint={props.hintProps}
        hint:placement={props.hintPlacement}
      >
        https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis
      </Link.Text>
    </Link>
  );
};

export const defaultProps: LinkEllipsisProps = {
  ellipsis: { ellipsis: true },
  size: 200,
  w: 120,
};

Demo.defaultProps = defaultProps;

export default Demo;
