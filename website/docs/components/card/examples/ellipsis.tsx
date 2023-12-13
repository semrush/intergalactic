import React from 'react';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import Ellipsis from '@semcore/ui/ellipsis';
import { Flex } from '@semcore/ui/flex-box';

const tooltipContent = `Hey! Don't forget to place some useful information here.`;

const Demo = () => (
  <Card w={'50%'}>
    <Card.Header>
      <Flex alignItems='center' tag='h4'>
        <Card.Title tag={Ellipsis} hint={tooltipContent}>
          Long title which should show ellipsis when there isn't enough space.
        </Card.Title>
      </Flex>
      <Card.Description tag={Ellipsis}>
        Very long description which should show ellipsis when there isn't enough space.
      </Card.Description>
    </Card.Header>
    <Card.Body tag={Ellipsis}>
      <Text size={200}>
        Long body text which should show ellipsis when there isn't enough space.
      </Text>
    </Card.Body>
  </Card>
);
export default Demo;
