import React from 'react';
import Ellipsis from '@semcore/ui/ellipsis';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <Box w={220}>
      <Ellipsis>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic nemo tenetur
        voluptatem! A aliquid assumenda dolore ducimus impedit numquam ratione recusandae sed ullam
        voluptate? Aperiam distinctio minus possimus quasi.
      </Ellipsis>
    </Box>
  );
};

export default Demo;
