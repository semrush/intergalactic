import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Flex } from '@semcore/flex-box';
import Badge from '@semcore/badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const BadgeMainTypes: Story = {
  render: (props) => {
    return (
      <>
        <Flex gap={2}>
          <Badge bg='blue-400'>admin</Badge>
          <Badge bg='red-400'>alpha</Badge>
          <Badge bg='orange-400'>beta</Badge>
          <Badge bg='green-400'>new</Badge>
          <Badge>soon</Badge>
        </Flex>
      </>
    );
  },
};
