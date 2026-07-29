import Badge from '@semcore/ui/badge';
import { Box, Flex } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  return (
    <Flex gap={4} alignItems='flex-start' direction='column'>
      <Flex ml={4} gap={2} alignItems='flex-start'>
        <Badge type='admin' />
        <Badge type='alpha' />
        <Badge type='beta' />
        <Badge type='new' />
        <Badge type='soon' />
        <Badge type='unavailable' />
      </Flex>
      <Box
        p={4}
        w='fit-content'
        bg='bg-primary-invert'
        borderRadius='surface-rounded'
      >
        <Flex gap={2} alignItems='flex-start'>
          <Badge type='admin' invert />
          <Badge type='alpha' invert />
          <Badge type='beta' invert />
          <Badge type='new' invert />
          <Badge type='soon' invert />
          <Badge type='unavailable' invert />
        </Flex>
      </Box>
      <Flex ml={4} gap={2} alignItems='flex-start'>
        <Badge type='admin' light />
        <Badge type='alpha' light />
        <Badge type='beta' light />
        <Badge type='new' light />
        <Badge type='soon' light />
        <Badge type='unavailable' light />
      </Flex>
    </Flex>
  );
};

export default Demo;
