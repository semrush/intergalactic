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
          <Badge type='admin' theme='invert' />
          <Badge type='alpha' theme='invert' />
          <Badge type='beta' theme='invert' />
          <Badge type='new' theme='invert' />
          <Badge type='soon' theme='invert' />
          <Badge type='unavailable' theme='invert' />
        </Flex>
      </Box>
      <Flex ml={4} gap={2} alignItems='flex-start'>
        <Badge type='admin' theme='light' />
        <Badge type='alpha' theme='light' />
        <Badge type='beta' theme='light' />
        <Badge type='new' theme='light' />
        <Badge type='soon' theme='light' />
        <Badge type='unavailable' theme='light' />
      </Flex>
    </Flex>
  );
};

export default Demo;
