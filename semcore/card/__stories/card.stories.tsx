import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Card from '@semcore/card';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import SettingsM from '@semcore/icon/Settings/m';
import Button from '@semcore/button';
import Select from '@semcore/select';
import { LinkTrigger } from '@semcore/base-trigger';
import Close from '@semcore/icon/Close/m';
import Ellipsis from '@semcore/ellipsis';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const tooltipContent = `Hey! Don't forget to place some useful information here.`;

export const BasicExample: Story = {
  render: (props) => {
    return (
      <Card tag='section' aria-labelledby='card-title'>
        <Card.Header>
          <Flex justifyContent='space-between' alignItems='center'>
            <Card.Title
              innerHint={tooltipContent}
              innerHintAriaLabel='About fastest animals'
              tag='h3'
              id='card-title'
            >
              Fastest animals
            </Card.Title>
            <Button addonLeft={SettingsM} use='tertiary' theme='muted' aria-label='Settings' />
          </Flex>
          <Card.Description>
            This is a list of the fastest animals in the world, by types of animal.
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Text size={200}>
            The peregrine falcon is the fastest bird, and the fastest member of the animal kingdom,
            with a diving speed of over 300 km/h (190 mph). The fastest land animal is the cheetah.
          </Text>
        </Card.Body>
      </Card>
    );
  },
};

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Label ${index}`,
    children: `Option ${index}`,
  }));

export const ComplexExample: Story = {
  render: (props) => {
    return (
      <Card>
        <Card.Header>
          <Flex alignItems='center' justifyContent='space-between'>
            <Flex alignItems='center' tag='h4'>
              <Card.Title innerHint={tooltipContent} innerHintAriaLabel='About this card'>
                Card Title
              </Card.Title>
            </Flex>
            <Flex alignItems='center'>
              <Text size={200} color='text-secondary' mr={2}>
                Updated: Tue, Jun 1, 2021
              </Text>
              <Button addonLeft={Close} use='tertiary' theme='muted' aria-label='Hide widget' />
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
  },
};

export const TruncatingTextWithEllipsis: Story = {
  render: (props) => {
    return (
      <Card w={'50%'}>
        <Card.Header>
          <Flex alignItems='center' tag='h4'>
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
  },
};
