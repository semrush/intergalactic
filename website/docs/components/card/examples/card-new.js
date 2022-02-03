import React from 'react';
import Card from '@semcore/card';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import Close from '@semcore/icon/Close/m';
import Select from '@semcore/select';
import { LinkTrigger } from '@semcore/base-trigger';

const TooltipContent = `Hey! Don't forget to place some useful info here 😏`;
const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Label ${index}`,
    children: `Option ${index}`,
  }));

export default () => (
  <Card>
    <Card.Header>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Card.Title w="234px" noWrap inline hint={TooltipContent}>
            Market Traffic vs Selected Domains Trends
          </Card.Title>
        </Flex>
        <Flex alignItems="center">
          <Text size={200} color="#6C6E79" mr={2}>
            Info about data (optiona)
          </Text>
          <Close color="stone" ml="auto" interactive />
        </Flex>
      </Flex>
      <Card.Description tag="div">
        <Select tag={LinkTrigger} options={options} placeholder="Select" mr={4} />
        This is card additional information or insights.
      </Card.Description>
    </Card.Header>
    <Card.Body>
      <Text size={200}>Your awesome card content ✨</Text>
    </Card.Body>
  </Card>
);
