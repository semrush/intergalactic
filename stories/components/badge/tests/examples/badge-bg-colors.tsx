import React from 'react';
import Badge from '@semcore/badge';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  return (
    <Flex gap={2}>

        <Badge bg='cyan' color="text-primary">cyan</Badge>
        <Badge bg='red' color="text-primary-invert">red</Badge>
        <Badge bg='mist' color="text-primary">mist</Badge>
        <Badge bg='orange' color="blue">orange</Badge>
        <Badge bg='green' color="text-primary-invert">green</Badge>
        <Badge bg='white' color="text-primary">white</Badge>
    </Flex>
  );
};

export default Demo;
