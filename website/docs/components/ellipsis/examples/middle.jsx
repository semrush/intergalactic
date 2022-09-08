import React from 'react';
import Ellipsis from '@semcore/ellipsis';
import { Box } from '@semcore/flex-box';

export default function () {
  return (
    <Box w={150}>
      <Ellipsis trim="middle">Source page very long title and URL</Ellipsis>
    </Box>
  );
}
