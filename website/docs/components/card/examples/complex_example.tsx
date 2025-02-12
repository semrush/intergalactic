import React from 'react';
import Card from '@semcore/card';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import Close from '@semcore/icon/Close/m';
import Select from '@semcore/select';
import { LinkTrigger } from '@semcore/base-trigger';
import Button from '@semcore/button';

const tooltipContent = `Hey! Don't forget to place some useful information here.`;
const options = ['Mobile', 'Desktop', 'Tablet'].map((value) => ({
  value,
  children: value,
}));

const Demo = () => (
  <Card>
    <Card.Header>
      <Flex alignItems='center' justifyContent='space-between'>
        <Card.Title innerHint={tooltipContent} innerHintAriaLabel='About this card' tag='h3'>
          Card Title
        </Card.Title>
        <Flex alignItems='center' gap={2}>
          <Text size={200} color='text-secondary'>
            Updated: Tue, Jun 1, 2021
          </Text>
          <Button addonLeft={Close} use='tertiary' theme='muted' aria-label='Hide widget' />
        </Flex>
      </Flex>
      <Card.Description tag='div'>
        <Select
          tag={LinkTrigger}
          options={options}
          placeholder='Select device'
          aria-label='Device'
          mr={4}
        />
        This is an optional additional information or insights.
      </Card.Description>
    </Card.Header>
    <Card.Body>
      <Text size={200}>Your awesome card content is placed here.</Text>
    </Card.Body>
  </Card>
);

export default Demo;
