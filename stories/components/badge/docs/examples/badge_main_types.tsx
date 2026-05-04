import Badge from '@semcore/ui/badge';
import { Box, Flex } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  return (
    <Flex gap={8} alignItems='center'>
      <Flex gap={2} alignItems='center'>
        <Badge type='admin' />
        <Badge type='alpha' />
        <Badge type='beta' />
        <Badge type='new' />
        <Badge type='soon' />
      </Flex>
      <Box
        p={4}
        style={{
          background: '#191b23',
          borderRadius: '6px',
          width: 'fit-content',
        }}
      >
        <Flex gap={2} alignItems='center'>
          <Badge type='admin' inverted />
          <Badge type='alpha' inverted />
          <Badge type='beta' inverted />
          <Badge type='new' inverted />
          <Badge type='soon' inverted />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Demo;
