import { Box } from '@semcore/base-components';
import Ellipsis from '@semcore/ellipsis';
import React from 'react';

const Demo = () => {
  return (
    <Box w={120}>
      <Ellipsis trim='middle'>Page with a very long URL</Ellipsis>
    </Box>
  );
};

export default Demo;
