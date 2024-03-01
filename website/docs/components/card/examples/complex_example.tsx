import React from 'react';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';
import Close from '@semcore/ui/icon/Close/m';
import Select from '@semcore/ui/select';
import { LinkTrigger } from '@semcore/ui/base-trigger';

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
            Optional info about data
          </Text>
          <Close color='icon-secondary-neutral' ml='auto' interactive aria-label='Close card' />
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
