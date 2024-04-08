import React from 'react';
import { Hint } from 'intergalactic/tooltip';
import { Box, Flex } from 'intergalactic/flex-box';
import Link from 'intergalactic/link';

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
