import React from 'react';
import Tooltip from 'intergalactic/tooltip';
import { Box, Flex } from 'intergalactic/flex-box';
import Link from 'intergalactic/link';

const Demo = () => (
  <Flex>
    <Box m='auto' p={5}>
      <Tooltip title='Hello, stranger' tag={Link}>
        Trigger
      </Tooltip>
    </Box>
  </Flex>
);

export default Demo;
