import React, { Component } from 'react';
import Tooltip from '@semcore/ui/tooltip';
import { Box, Flex } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';

class Demo extends Component {
  render() {
    return (
      <Flex>
        <Box m="auto" p={5}>
          <Tooltip interaction="click" disablePortal>
            <Tooltip.Trigger>
              <Button>Click me</Button>
            </Tooltip.Trigger>
            <Tooltip.Popper> I got rendered 😎</Tooltip.Popper>
          </Tooltip>
        </Box>
      </Flex>
    );
  }
}

export default Demo;
