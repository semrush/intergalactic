import React from 'react';
import Ellipsis from '@semcore/ui/ellipsis';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';

export default function () {
  return (
    <Card w={220}>
      <Card.Header>
        <Card.Title tag='h4' inline my={0}>
          Card heading
        </Card.Title>
        <Card.Description tag='div'>
          <Ellipsis maxLine={3}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic nemo tenetur
            voluptatem! A aliquid assumenda dolore ducimus impedit numquam ratione recusandae sed
            ullam voluptate? Aperiam distinctio minus possimus quasi.
          </Ellipsis>
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Text size={100}>Your awesome card content ✨</Text>
      </Card.Body>
    </Card>
  );
}
