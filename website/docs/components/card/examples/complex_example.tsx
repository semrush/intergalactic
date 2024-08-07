import React from 'react';
import Card from 'intergalactic/card';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';
import Close from 'intergalactic/icon/Close/m';
import Select from 'intergalactic/select';
import { LinkTrigger } from 'intergalactic/base-trigger';
import Button from 'intergalactic/button';
import { Hint } from 'intergalactic/tooltip';

const tooltipContent = `Hey! Don't forget to place some useful information here.`;
const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Label ${index}`,
    children: `Option ${index}`,
  }));

const Demo = () => (
  <Card>
    <Card.Header>
      <Flex alignItems='center' justifyContent='space-between'>
        <Flex alignItems='center' tag='h4'>
          <Card.Title innerHint={tooltipContent}>Card Title</Card.Title>
        </Flex>
        <Flex alignItems='center'>
          <Text size={200} color='text-secondary' mr={2}>
            Updated: Tue, Jun 1, 2021
          </Text>
          <Hint tag={Button} addonLeft={Close} use='tertiary' theme='muted' title='Hide widget' />
        </Flex>
      </Flex>
      <Card.Description tag='div'>
        <Select tag={LinkTrigger} options={options} placeholder='Select' mr={4} />
        This is an optional additional information or insights.
      </Card.Description>
    </Card.Header>
    <Card.Body>
      <Text size={200}>Your awesome card content is placed here.</Text>
    </Card.Body>
  </Card>
);

export default Demo;
