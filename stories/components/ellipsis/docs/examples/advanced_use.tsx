import { Box } from '@semcore/ui/base-components';
import Ellipsis from '@semcore/ui/ellipsis';
import type { EllipsisProps } from '@semcore/ui/ellipsis';
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
