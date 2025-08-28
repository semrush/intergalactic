import type { EllipsisSettings } from '@semcore/base-components';
import Link from '@semcore/link';
import React from 'react';

type DemoProps = {
  ellipsis?: true | EllipsisSettings;
};

const Demo = (props: DemoProps) => {
  return (
    <Link
      href='https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis'
      ellipsis={props.ellipsis}
      w={120}
    >
      <Link.Text>
        https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis
      </Link.Text>
    </Link>
  );
};

export const defaultProps: DemoProps = {
  ellipsis: true,
};

Demo.defaultProps = defaultProps;

export default Demo;
