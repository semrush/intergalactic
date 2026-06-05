import { Box, Flex } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  const bg = 'bg-primary-advertising';

  return (
    <div>
      <Flex justifyContent='space-between'>
        <Box m={5} p={5} bg={bg} />
        <Box m={5} p={5} bg={bg} />
        <Box m={5} p={5} bg={bg} />
      </Flex>
      <hr />
      <Flex alignItems='center'>
        <Box h={100} m={5} p={5} bg={bg} />
        <Box h={60} m={5} p={5} bg={bg} />
        <Box ml='auto' m={5} p={5} bg={bg} />
      </Flex>
    </div>
  );
};

export default Demo;
