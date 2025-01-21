import React from 'react';
import Ellipsis from '@semcore/ellipsis';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  return (
    <Box w={150}>
      <Ellipsis trim='middle'>Source page with a very long title and URL</Ellipsis>
    </Box>
  );
};

export default Demo;
