import React from 'react';
import Ellipsis from '@semcore/ellipsis';
import { Box } from '@semcore/flex-box';

export const EllipsisWithOnVisibleChangeHandler = () => {
  return (
    <Box w={220}>
      <Ellipsis onVisibleChange={() => alert('Hi!')}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic nemo tenetur
        voluptatem! A aliquid assumenda dolore ducimus impedit numquam ratione recusandae sed ullam
        voluptate? Aperiam distinctio minus possimus quasi.
      </Ellipsis>
    </Box>
  );
};
