import React from 'react';
import Badge from '@semcore/badge';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  return (
    <Flex gap={2}>
      <Badge bg='blue-400'>admin</Badge>
      <Badge bg='red-400'>alpha</Badge>
      <Badge bg='orange-400'>beta</Badge>
      <Badge bg='green-400'>new</Badge>
      <Badge>soon</Badge>
    </Flex>
  );
};

export default Demo;
