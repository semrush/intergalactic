import Ellipsis from '@semcore/ellipsis';
import { Box } from '@semcore/flex-box';
import React from 'react';

const Demo = () => {
  return (
    <Box>
      <Ellipsis trim='middle' cursorAnchoring>
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

export default Demo;
