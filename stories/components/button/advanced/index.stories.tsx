import type { Meta, StoryObj } from '@storybook/react';

import Button from '@semcore/button';

import ButtonExample from './examples/Basic';
import ButtonSizesExample from './examples/ButtonSizes';

const meta: Meta<typeof Button> = {
  title: 'Components/Button/Advanced',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const SimpleButton: Story = {
  render: ButtonExample,
};

export const Sizes: Story = {
  render: ButtonSizesExample,
};
