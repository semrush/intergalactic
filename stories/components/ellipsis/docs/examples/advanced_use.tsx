import { Box } from '@semcore/base-components';
import Ellipsis from '@semcore/ellipsis';
import type { EllipsisProps } from '@semcore/ellipsis';
import React from 'react';

const Demo = (props: EllipsisProps) => {
  return (
    <Box>
      <Ellipsis trim={props.trim} tooltip={props.tooltip} maxLine={props.maxLine}>
        <Ellipsis.Content w={300}>
          Intergalactic, planetary, planetary, intergalactic Intergalactic, planetary, planetary,
          intergalactic Intergalactic, planetary, planetary, intergalactic Intergalactic, planetary,
          planetary, intergalactic Another dimension, another dimension
        </Ellipsis.Content>
        <Ellipsis.Popper w={500} wMax={500} />
      </Ellipsis>
    </Box>
  );
};

export const defaultProps: EllipsisProps = {
  trim: 'middle',
  tooltip: undefined,
  maxLine: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
