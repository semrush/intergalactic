import type { Meta, StoryObj } from '@storybook/react';

import Icon from '@semcore/icon';

import SizesExample from './examples/illustration_sizes';

const meta: Meta<typeof Icon> = {
  title: 'Components/Illustration/Tests',
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Sizes: Story = {
  render: SizesExample,
};
