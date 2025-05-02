import React from 'react';
import Badge from '@semcore/badge';
import { Flex } from '@semcore/flex-box';

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
