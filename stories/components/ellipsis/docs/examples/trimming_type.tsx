import React from 'react';
import Ellipsis from '@semcore/ellipsis';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  return (
    <Box w={120}>
      <Ellipsis trim='middle'>Page with a very long URL</Ellipsis>
    </Box>
  );
};

export default Demo;
