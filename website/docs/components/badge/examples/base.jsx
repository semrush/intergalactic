import React from 'react';
import Badge from '@semcore/badge';
import { Flex } from '@semcore/flex-box';

export default () => {
  return (
    <Flex gap={2}>
      <Badge bg="blue-300">admin</Badge>
      <Badge bg="red-300">alpha</Badge>
      <Badge bg="orange-300">beta</Badge>
      <Badge bg="green-300">new</Badge>
      <Badge>soon</Badge>
    </Flex>
  );
};
