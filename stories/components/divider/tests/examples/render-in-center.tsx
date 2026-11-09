import { Box, Flex } from '@semcore/ui/base-components';
import Divider from '@semcore/ui/divider';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Flex alignItems='center' w={100} h={20}>
        <Box w='50%' h={20} style={{ background: 'yellow' }} />
        <Divider orientation='vertical' />
        <Box w='50%' h={20} style={{ background: 'yellow' }} />
      </Flex>
      <Flex direction='column' justifyContent='center' w={100}>
        <Box h={20} style={{ background: 'blue' }} />
        <Divider orientation='horizontal' />
        <Box h={20} style={{ background: 'blue' }} />
      </Flex>
    </>
  );
};

export default Demo;
