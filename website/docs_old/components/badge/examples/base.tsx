import React from 'react';
import Badge from '@semcore/ui/badge';
import { Flex } from '@semcore/ui/flex-box';

export default () => {
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
