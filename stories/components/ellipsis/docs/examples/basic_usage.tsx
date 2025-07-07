import { Box } from '@semcore/base-components';
import type { EllipsisProps } from '@semcore/ellipsis';
import Ellipsis from '@semcore/ellipsis';
import Link from '@semcore/link';
import React from 'react';

const Demo = (props: EllipsisProps) => {
  return (
    <Box w={220}>
      <Link inline href='https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis'>
        <Link.Text tag={Ellipsis} trim={props.trim} tooltip={props.tooltip} maxLine={props.maxLine}>
          https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis
        </Link.Text>
      </Link>
    </Box>
  );
};

export const defaultProps: EllipsisProps = {
  trim: 'end',
  tooltip: true,
  maxLine: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
