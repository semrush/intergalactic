import { Box } from '@semcore/ui/base-components';
import Ellipsis from '@semcore/ui/ellipsis';
import React from 'react';

const Demo = () => {
  return (
    <Box w={120}>
      <Ellipsis trim='middle'>Page with a very long URL</Ellipsis>
    </Box>
  );
};

export default Demo;
