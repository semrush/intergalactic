import { Flex } from '@semcore/ui/base-components';
import Badge from '@semcore/ui/status-badge';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Flex gap={2}>
        <Badge type='admin' />
        <Badge type='alpha' />
        <Badge type='beta' />
        <Badge type='new' />
        <Badge type='for you' />
        <Badge type='soon' />
      </Flex>
      <br />
      <Flex gap={2} style={{ background: '#000' }} p='4px 0'>
        <Badge type='admin' inverted />
        <Badge type='alpha' inverted />
        <Badge type='beta' inverted />
        <Badge type='new' inverted />
        <Badge type='for you' inverted />
        <Badge type='soon' inverted />
      </Flex>
    </>
  );
};

export default Demo;
