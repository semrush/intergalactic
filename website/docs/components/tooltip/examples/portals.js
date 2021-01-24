import React, { Component } from 'react';
import Tooltip from '@semcore/tooltip';
import { Box, Flex } from '@semcore/flex-box';
import Button from '@semcore/button';

class Demo extends Component {
  render() {
    return (
      <Flex>
        <Box m="auto" p={5}>
          <Tooltip interaction="click" disablePortal>
            <Tooltip.Trigger>
              <Button>Click me</Button>
            </Tooltip.Trigger>
            <Tooltip.Popper>Я разрендерился 😎</Tooltip.Popper>
          </Tooltip>
        </Box>
      </Flex>
    );
  }
}

export default Demo;
