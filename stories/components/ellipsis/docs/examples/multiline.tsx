import React from 'react';
import Ellipsis from '@semcore/ellipsis';
import Card from '@semcore/card';
import { Text } from '@semcore/typography';

const Demo = () => {
  return (
    <Card w={220}>
      <Card.Header>
        <Card.Title tag='h4' inline my={0} size={300}>
          Card heading
        </Card.Title>
        <Card.Description tag='div' size={200}>
          <Ellipsis maxLine={1}>Additional long card description</Ellipsis>
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Text size={300}>Card content</Text>
      </Card.Body>
    </Card>
  );
};

export default Demo;
