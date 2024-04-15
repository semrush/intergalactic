import React from 'react';
import Tooltip from 'intergalactic/tooltip';
import { Box, Flex } from 'intergalactic/flex-box';
import Link from 'intergalactic/link';

const Demo = () => (
  <Flex>
    <Box m='auto' p={5}>
      <Tooltip>
        <Tooltip.Trigger aria-describedby={undefined} role={undefined}>
          {({ popperId }) => <Link aria-describedby={popperId}>Tooltip trigger</Link>}
        </Tooltip.Trigger>
        <Tooltip.Popper>Hello, stranger!</Tooltip.Popper>
      </Tooltip>
    </Box>
  </Flex>
);

export default Demo;
