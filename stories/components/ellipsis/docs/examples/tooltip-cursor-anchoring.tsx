import React from 'react';
import Ellipsis from '@semcore/ellipsis';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  return (
    <Box>
      <Ellipsis trim='middle' cursorAnchoring>
        <Ellipsis.Content w={500}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem commodi,
          doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum tempore
          voluptas. Aliquam eos expedita illo quasi unde!
        </Ellipsis.Content>
        <Ellipsis.Popper w={200} wMax={500} />
      </Ellipsis>
    </Box>
  );
};

export default Demo;
