import { Box, Flex } from '@semcore/flex-box';
import Scroll from '@semcore/scroll-area';
import React from 'react';

class Demo extends React.PureComponent {
  render() {
    return (
      <Flex direction='column' gap={2}>
        <Scroll hMax='50vh' style={{ border: '1px solid red' }}>
          {[...new Array(100)].map((_, index) => (
            <Box key={index} p={1}>
              Line #{index}
            </Box>
          ))}
        </Scroll>
        <Box>Content after</Box>
      </Flex>
    );
  }
}

export default () => <Demo />;
