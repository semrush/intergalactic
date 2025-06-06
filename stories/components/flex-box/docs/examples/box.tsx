import Button from '@semcore/button';
import { Box } from '@semcore/flex-box';
import React from 'react';

const Demo = () => (
  <div>
    <Box tag={Button} mr={2}>
      Button 1
    </Box>
    <Box tag={Button} mr={2}>
      Button 2
    </Box>
    <Box tag={Button} mr={2}>
      Button 3
    </Box>
    <Box tag={Button} mr={2}>
      Button 4
    </Box>
  </div>
);

export default Demo;
