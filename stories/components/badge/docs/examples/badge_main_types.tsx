import Badge from '@semcore/ui/badge';
import { Flex } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Flex gap={2}>
        <Badge type='admin' />
        <Badge type='alpha' />
        <Badge type='beta' />
        <Badge type='new' />
        <Badge type='soon' />
      </Flex>
      <Flex gap={2} mt={2} p='4px 0' style={{ background: '#000' }}>
        <Badge type='admin' inverted />
        <Badge type='alpha' inverted />
        <Badge type='beta' inverted />
        <Badge type='new' inverted />
        <Badge type='soon' inverted />
      </Flex>
    </>
  );
};

export default Demo;
