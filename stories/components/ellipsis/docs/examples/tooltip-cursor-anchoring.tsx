import { Box } from '@semcore/ui/base-components';
import Ellipsis from '@semcore/ui/ellipsis';
import type { EllipsisProps } from '@semcore/ui/ellipsis';
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
