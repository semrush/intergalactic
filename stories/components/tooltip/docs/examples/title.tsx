import { Box, Flex } from '@semcore/ui/base-components';
import Link from '@semcore/ui/link';
import { Hint } from '@semcore/ui/tooltip';
import React from 'react';

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
