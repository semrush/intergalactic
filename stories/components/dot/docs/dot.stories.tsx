import type { Meta, StoryObj } from '@storybook/react';

import Dot from '@semcore/dot';

import DotAnimationExample from './examples/example_of_dot_animation';

const meta: Meta<typeof Dot> = {
  title: 'Components/Dot/Documentation',
  component: Dot,
};

export default meta;
type Story = StoryObj<typeof Dot>;

export const DotAnimation: Story = {
  render: DotAnimationExample,
};
