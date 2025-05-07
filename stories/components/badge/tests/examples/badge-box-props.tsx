import React from 'react';
import Badge from '@semcore/badge';
import { Flex } from '@semcore/flex-box';
import {Text} from '@semcore/typography';

const Demo = () => {
  return (
    <Flex gap={2}>

        <Badge bg='cyan' color="text-primary" w={100}h={20}><Text size={200}>cyan</Text></Badge>
        <Badge bg='red' color="text-primary-invert" h={30}>red</Badge>
        <Badge bg='mist' color="text-primary" m={4}>mist</Badge>
        <Badge bg='orange' color="blue" h={30} pt={3}>orange</Badge>
    </Flex>
  );
};

export default Demo;
