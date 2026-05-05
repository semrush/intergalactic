import { Flex } from '@semcore/ui/flex-box';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const tooltipContent = `Hey! Don't forget to place some useful information here.`;

const Demo = () => (
  <Card w='50%'>
    <Card.Header>
      <Text size={300} tag='h3' m={0} display='flex'>
        <Card.Title
          ellipsis={true}
          hintAfter={tooltipContent}
          hintAfterAriaLabel='About this long text'
        >
          Long title which should show ellipsis when there isn't enough space.
        </Card.Title>
      </Text>
      <Card.Description ellipsis={true}>
        Very long description which should show ellipsis when there isn't enough space.
      </Card.Description>
    </Card.Header>
    <Card.Body>
      <Text tag='div' w='100%' size={200} ellipsis={true}>
        Long body text which should show ellipsis when there isn't enough space.
      </Text>
    </Card.Body>
  </Card>
);
export default Demo;
