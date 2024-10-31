import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Badge from '@semcore/badge';
import CheckM from '@semcore/icon/Check/m';
import Button from '@semcore/button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button/TestingExamples',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const SimpleButton: Story = {
  args: {
    children: 'Button',
    size: 'm',
    onClick: fn(),
    use: 'primary',
  },
};

export const Addons: Story = {
  render: () => {
    return (
      <>
        <Button addonLeft={CheckM} use={'secondary'}>
          Some button text
        </Button>
        <Button ml={2} use={'secondary'}>
          <Button.Text>Some button text</Button.Text>
          <Button.Addon>
            <Badge bg='--intergalactic-control-primary-success'>new</Badge>
          </Button.Addon>
        </Button>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <>
        <Button size={'m'}>Medium</Button>
        <Button size={'l'} ml={2}>
          Large
        </Button>
      </>
    );
  },
};
