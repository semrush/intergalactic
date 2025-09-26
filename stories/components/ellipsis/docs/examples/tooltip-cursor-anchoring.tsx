import { Box } from '@semcore/base-components';
import Ellipsis from '@semcore/ellipsis';
import type { EllipsisProps } from '@semcore/ellipsis';
import React from 'react';

const Demo = (props: EllipsisProps) => {
  return (
    <Box>
      <Ellipsis trim={props.trim} cursorAnchoring>
        <Ellipsis.Content w={500}>
          Intergalactic, planetary, planetary, intergalactic Intergalactic, planetary, planetary,
          intergalactic Intergalactic, planetary, planetary, intergalactic Intergalactic, planetary,
          planetary, intergalactic Another dimension, another dimension
        </Ellipsis.Content>
        <Ellipsis.Popper w={400} wMax={500} />
      </Ellipsis>
    </Box>
  );
};

export const defaultProps: EllipsisProps = {
  trim: 'middle',
};

Demo.defaultProps = defaultProps;

export default Demo;
