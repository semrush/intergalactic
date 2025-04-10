import React from 'react';
import Badge from 'intergalactic/badge';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <Flex gap={2}>
      <Badge bg='blue-400'>admin</Badge>
      <Badge bg='red-400'>alpha</Badge>
      <Badge bg='orange-400'>beta</Badge>
      <Badge bg='green-400'>new</Badge>
      <Badge bg='violet-400'>for you</Badge>
      <Badge>soon</Badge>
    </Flex>
  );
};

export default Demo;
