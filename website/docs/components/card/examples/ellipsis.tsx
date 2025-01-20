import React from 'react';
import Card from 'intergalactic/card';
import { Text } from 'intergalactic/typography';
import Ellipsis from 'intergalactic/ellipsis';
import { Flex } from 'intergalactic/flex-box';

const tooltipContent = `Hey! Don't forget to place some useful information here.`;

const Demo = () => (
  <Card w={'50%'}>
    <Card.Header>
      <Flex alignItems='center' tag='h3'>
        <Card.Title
          tag={Ellipsis}
          hintAfter={tooltipContent}
          hintAfterAriaLabel='About this long text'
        >
          Long title which should show ellipsis when there isn't enough space.
        </Card.Title>
      </Flex>
      <Card.Description tag={Ellipsis}>
        Very long description which should show ellipsis when there isn't enough space.
      </Card.Description>
    </Card.Header>
    <Card.Body>
      <Text tag={Ellipsis} size={200}>
        Long body text which should show ellipsis when there isn't enough space.
      </Text>
    </Card.Body>
  </Card>
);
export default Demo;
