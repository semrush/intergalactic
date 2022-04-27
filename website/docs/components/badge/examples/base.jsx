import React from 'react';
import Badge from '@semcore/badge';
import { Box } from '@semcore/flex-box';

const BageList = [
  <Badge bg="blue-300">admin</Badge>,
  <Badge bg="red-300">alpha</Badge>,
  <Badge bg="orange-300">beta</Badge>,
  <Badge bg="green-300">new</Badge>,
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
