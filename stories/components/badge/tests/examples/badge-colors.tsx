import React from 'react';
import Badge from 'intergalactic/badge';
import { Flex } from 'intergalactic/flex-box';

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
