import React from 'react';
import Badge from '@semcore/badge';
import { Box } from '@semcore/flex-box';

const BageList = [
  <Badge bg="cyan">admin</Badge>,
  <Badge bg="red">alpha</Badge>,
  <Badge bg="orange">beta</Badge>,
  <Badge bg="green">new</Badge>,
  <Badge>soon</Badge>,
];

export default () => {
  return (
    <>
      {BageList.map((Item) => (
        <Box m={2} inline>
          {Item}
        </Box>
      ))}
    </>
  );
};
