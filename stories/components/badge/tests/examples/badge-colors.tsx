import Badge from '@semcore/ui/badge';
import { Flex } from '@semcore/ui/flex-box';
import React from 'react';

const Demo = () => {
  return (
    <Flex gap={2}>
      <Badge color='white'>white</Badge>
      <Badge color='gray20'>gray20</Badge>
      <Badge color='green'>green</Badge>
      <Badge>default</Badge>
    </Flex>
  );
};

export default Demo;
