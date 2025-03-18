import React from 'react';
import { Box, Flex } from '@semcore/flex-box';

const Demo = () => {
  const styleBox = {
    border: '1px solid',
    background: '#ccc',
  };

  return (
    <div>
      <Flex columnGap={2} scaleIndent={10}>
        <Box inline style={styleBox} w={100} h={100}>
          column gap left
        </Box>
        <Box inline style={styleBox} w={100} h={100}>
          column gap right
        </Box>
      </Flex>

      <br />
      <br />

      <Flex rowGap={5} w={100} direction='column'>
        <Box inline style={styleBox} w={100} h={100}>
          row gap upper
        </Box>
        <Box inline style={styleBox} w={100} h={100}>
          row gap lower
        </Box>
      </Flex>

      <br />
      <br />

      <Flex gap={5} w={225} h={225} flexWrap={true}>
        <Box inline style={styleBox} w={100} h={100}>
          gap left-upper
        </Box>
        <Box inline style={styleBox} w={100} h={100}>
          gap right-upper
        </Box>
        <Box inline style={styleBox} w={100} h={100}>
          gap left-lower
        </Box>
        <Box inline style={styleBox} w={100} h={100}>
          gap right-lower
        </Box>
      </Flex>
    </div>
  );
};

export default Demo;
