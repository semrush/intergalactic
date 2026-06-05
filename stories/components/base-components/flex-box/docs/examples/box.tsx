import { Box } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
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
    <Box tag={Button}>
      Button 4
    </Box>
  </div>
);

export default Demo;
