import React from 'react';
import Tooltip from 'intergalactic/tooltip';
import { Box, Flex } from 'intergalactic/flex-box';
import Link from 'intergalactic/link';

const Demo = () => (
  <Flex>
    <Box m='auto' p={5}>
      <Tooltip>
        <Tooltip.Trigger tag={Link}>Trigger</Tooltip.Trigger>
        <Tooltip.Popper>Hello, stranger</Tooltip.Popper>
      </Tooltip>
    </Box>
  </Flex>
);

export default Demo;
