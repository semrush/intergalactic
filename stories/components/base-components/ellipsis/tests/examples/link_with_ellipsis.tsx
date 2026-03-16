import type { EllipsisSettings, SimpleHintPopperProps } from '@semcore/ui/base-components';
import Link from '@semcore/ui/link';
import React from 'react';

type LinkEllipsisProps = {
  ellipsis?: true | EllipsisSettings;
  w?: number | string;
  color?: string;
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
  active?: boolean;
  disabled?: boolean;
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
};

const Demo = (props: LinkEllipsisProps) => {
  let linkDisplayValue: 'inline-block' | undefined;

  if (typeof props.ellipsis === 'object' && props.ellipsis.maxLine && props.ellipsis.maxLine > 1) {
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
        ellipsis={props.ellipsis}
        w={props.w}
        color={props.color}
        size={props.size}
        hintProps={{
          ...(props.hintPlacement ? { placement: props.hintPlacement } : {}),

        }}
      >
        https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis
      </Link.Text>
    </Link>
  );
};

export const defaultProps: LinkEllipsisProps = {
  ellipsis: true,
  size: 200,
  w: 120,
};

Demo.defaultProps = defaultProps;

export default Demo;
