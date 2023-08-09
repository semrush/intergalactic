import React from 'react';
import Tooltip from '@semcore/ui/tooltip';
import { Box, Flex } from '@semcore/ui/flex-box';
import Link from '@semcore/ui/link';

export default () => (
  <Flex>
    <Box m='auto' p={5}>
      <Tooltip title='Hello, stranger 😉'>
        <Link>Trigger</Link>
      </Tooltip>
    </Box>
  </Flex>
);
