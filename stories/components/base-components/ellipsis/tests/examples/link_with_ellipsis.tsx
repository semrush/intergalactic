import type { EllipsisSettings } from '@semcore/ui/base-components';
import Link from '@semcore/ui/link';
import React from 'react';

type Linkrops = {
  ellipsis?: true | EllipsisSettings;
};

const Demo = (props: Linkrops) => {
  return (
    <Link href='https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis'>
      <Link.Text
        ellipsis={props.ellipsis}
        w={120}
      >
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
