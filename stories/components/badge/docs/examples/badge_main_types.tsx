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
          <Badge type='admin' inverted />
          <Badge type='alpha' inverted />
          <Badge type='beta' inverted />
          <Badge type='new' inverted />
          <Badge type='soon' inverted />
          <Badge type='unavailable' inverted />
        </Flex>
      </Box>
      <Flex ml={4} gap={2} alignItems='flex-start'>
        <Badge type='admin' accent />
        <Badge type='alpha' accent />
        <Badge type='beta' accent />
        <Badge type='new' accent />
        <Badge type='soon' accent />
        <Badge type='unavailable' accent />
      </Flex>
    </Flex>
  );
};

export default Demo;
