import { ScrollArea, Box, Flex } from '@semcore/ui/base-components';
import React from 'react';

class Demo extends React.PureComponent {
  render() {
    return (
      <Flex direction='column' gap={2}>
        <ScrollArea hMax='50vh' style={{ border: '1px solid red' }}>
          {[...new Array(100)].map((_, index) => (
            <Box key={index} p={1}>
              Line #{index}
            </Box>
          ))}
        </ScrollArea>
        <Box>Content after</Box>
      </Flex>
    );
  }
}

export default () => <Demo />;
