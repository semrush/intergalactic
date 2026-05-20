import { Box, Flex } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  const styleBox = {
    background: 'var(--intergalactic-bg-primary-advertising)',
  };

  return (
    <div>
      <Flex justifyContent='space-between'>
        <Box m={5} p={5} style={styleBox} />
        <Box m={5} p={5} style={styleBox} />
        <Box m={5} p={5} style={styleBox} />
      </Flex>
      <hr />
      <Flex alignItems='center'>
        <Box h={100} m={5} p={5} style={styleBox} />
        <Box h={60} m={5} p={5} style={styleBox} />
        <Box ml='auto' m={5} p={5} style={styleBox} />
      </Flex>
    </div>
  );
};

export default Demo;
