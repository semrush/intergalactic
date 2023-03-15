import React from 'react';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';
import Close from '@semcore/ui/icon/Close/m';
import Select from '@semcore/ui/select';
import { LinkTrigger } from '@semcore/ui/base-trigger';

const tooltipContent = `Hey! Don't forget to place some useful info here 😏`;
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
          <Card.Title hint={tooltipContent}>
            Market Traffic vs Selected Domains Trends
          </Card.Title>
        </Flex>
        <Flex alignItems="center">
          <Text size={200} color="#6C6E79" mr={2}>
            Info about data (optiona)
          </Text>
          <Close color="stone" ml="auto" interactive aria-label="Close card" />
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
