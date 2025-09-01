import type { EllipsisSettings } from '@semcore/base-components';
import Link from '@semcore/link';
import React from 'react';

type Linkrops = {
  ellipsis?: true | EllipsisSettings;
};

const Demo = (props: Linkrops) => {
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

export const defaultProps: Linkrops = {
  ellipsis: true,
};

Demo.defaultProps = defaultProps;

export default Demo;
