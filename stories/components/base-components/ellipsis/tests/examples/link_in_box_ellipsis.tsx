import { Box } from '@semcore/base-components';
import type { EllipsisSettings } from '@semcore/base-components';
import Link from '@semcore/link';
import React from 'react';

type DemoProps = {
  ellipsis?: boolean | EllipsisSettings;
};

const Demo = (props: DemoProps) => {
  return (
    <Box w={120}>
      <Link
        href='https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis'
        ellipsis={props.ellipsis}
      >
        <Link.Text>
          https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis
        </Link.Text>
      </Link>
    </Box>
  );
};

export const defaultProps: EllipsisSettings = {
  ellipsis: true,
};

Demo.defaultProps = defaultProps;

export default Demo;
