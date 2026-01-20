import type { EllipsisSettings } from '@semcore/ui/base-components';
import Link from '@semcore/ui/link';
import React from 'react';

type LinkEllipsisProps = {
  ellipsis?: true | EllipsisSettings;
  w?: number | string;
  color?: string;
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
  active?: boolean;
  disabled?: boolean;
};

const Demo = (props: LinkEllipsisProps) => {
  const linkRef = React.useRef<HTMLAnchorElement>(null);
  return (
    <Link
      href='https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis'
      ref={linkRef}
      active={props.active}
      disabled={props.disabled}
    >
      <Link.Text
        ellipsis={props.ellipsis}
        hintProps={{ triggerRef: linkRef }}
        w={props.w}
        color={props.color}
        size={props.size}
      >
        https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis
      </Link.Text>
    </Link>
  );
};

export const defaultProps: LinkEllipsisProps = {
  ellipsis: true,
  w: 120,
};

Demo.defaultProps = defaultProps;

export default Demo;
