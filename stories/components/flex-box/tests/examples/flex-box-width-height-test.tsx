
import React from 'react';
import { Box, Flex } from '@semcore/flex-box';

const Demo = () => {
  const styleBox = {
    border: '1px solid',
    background: '#ccc',
  };
    return (
      <div>
      <Flex direction="row" alignItems="flex-start"  w='400px' h='100px' >
       
        <Box style={styleBox} w={0.5} h={0.25}>
        w={0.5} h={0.25}
        </Box>
        </Flex>

        <Flex direction="row"  alignItems="flex-start"  w='400px' h='100'>
        <Box  style={styleBox} w='50px' h='50px'>
        w='50' h='50'
        </Box>
        </Flex>

        <Flex direction="row"  alignItems="flex-start"  w='400px' h='100px'>
        <Box style={styleBox} w={2 / 5} h='auto'>
        w={2 / 5} 
        h='auto'
        </Box>
        </Flex>
        <Flex direction="row"  alignItems="flex-start"  w='400px' h='100px'>
        <Box style={styleBox} h={2 / 5} w='50px'>
        h={2 / 5} w='auto'
        </Box>
        </Flex>
        <Flex direction="row"  alignItems="flex-start"  w='400px' h='100px'>
        <Box style={styleBox} wMax='100px' hMax='50px'>
        wMax='100px' hMax='50px'
        </Box>
        </Flex>
        <Flex direction="row"  alignItems="flex-start"  w='400px' h='100px'>
        <Box style={styleBox} wMin='100px' hMin='100px'>
        box  box box 
        </Box>
      </Flex>
      </div>
    );
 
};
  
  export default Demo;
  