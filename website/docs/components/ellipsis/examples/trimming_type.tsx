import React from 'react';
import Ellipsis from 'intergalactic/ellipsis';
import { Box } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <Box w={150}>
      <Ellipsis trim='middle'>Source page very long title and URL</Ellipsis>
    </Box>
  );
};

export default Demo;
