import React from 'react';
import Ellipsis from '@semcore/ui/ellipsis';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <Box w={150}>
      <Ellipsis trim='middle'>Source page very long title and URL</Ellipsis>
    </Box>
  );
}