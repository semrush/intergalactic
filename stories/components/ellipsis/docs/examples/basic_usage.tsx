import { Box } from '@semcore/ui/base-components';
import type { EllipsisProps } from '@semcore/ui/ellipsis';
import Ellipsis from '@semcore/ui/ellipsis';
import Link from '@semcore/ui/link';
import React from 'react';

const Demo = (props: EllipsisProps) => {
  let linkDisplayValue: 'block' | undefined;

  if (props.maxLine && props.maxLine > 1) {
    linkDisplayValue = 'block';
  }

  return (
    <Box w={220}>
      <Link
        inline
        href='https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis'
        display={linkDisplayValue}
      >
        <Link.Text
          tag={Ellipsis}
          trim={props.trim}
          tooltip={props.tooltip}
          maxLine={props.maxLine}
        >
          https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis
        </Link.Text>
      </Link>
    </Box>
  );
};

export const defaultProps: EllipsisProps = {
  trim: undefined,
  tooltip: undefined,
  maxLine: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
