import React from 'react';
import Tooltip from '@semcore/tooltip';
import { Box, Flex } from '@semcore/flex-box';
import Link from '@semcore/link';

export default () => (
  <Flex>
    <Box m="auto" p={5}>
      <Tooltip>
        <Tooltip.Trigger>
          <Link>Trigger</Link>
        </Tooltip.Trigger>
        <Tooltip.Popper>Hello, stranger 😉</Tooltip.Popper>
      </Tooltip>
    </Box>
  </Flex>
);
