import React from 'react';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import Ellipsis from '@semcore/ui/ellipsis';
import { Flex } from '@semcore/ui/flex-box';

const tooltipContent = `Hey! Don't forget to place some useful info here`;

export default () => (
  <Card w={'50%'}>
    <Card.Header>
      <Flex alignItems='center' tag='h4'>
        <Card.Title tag={Ellipsis} hint={tooltipContent}>
          Very long card title which should show ellipsis when there isn't enough space
        </Card.Title>
      </Flex>
      <Card.Description tag={Ellipsis}>
        Very long description title which should show ellipsis when there isn't enough space
      </Card.Description>
    </Card.Header>
    <Card.Body tag={Ellipsis}>
      <Text size={100}>
        Very long card body which should show ellipsis when there isn't enough space
      </Text>
    </Card.Body>
  </Card>
);
