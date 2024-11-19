import React from 'react';
import { Hint } from '@semcore/tooltip';
import { Box, Flex } from '@semcore/flex-box';
import Link from '@semcore/link';

const Demo = () => (
  <Flex>
    <Box m='auto' p={5}>
      <Hint title='Hello, stranger!' tag={Link}>
        Title trigger
      </Hint>
    </Box>
  </Flex>
);

export default Demo;
