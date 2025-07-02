import { Box } from '@semcore/base-components';
import Ellipsis from '@semcore/ellipsis';
import React from 'react';

import type { ExampleEllipsisProps } from '../ellipsis.stories';

const Demo = (props: ExampleEllipsisProps) => {
  return (
    <Box>
      <Ellipsis trim={props.trim} tooltip={props.tooltip}>
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

export const defaultProps: ExampleEllipsisProps = {
  trim: 'middle',
  tooltip: true,
};

Demo.defaultProps = defaultProps;

export default Demo;
