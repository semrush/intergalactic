import Divider from '@semcore/divider';
import type { Meta, StoryObj } from '@storybook/react';

import CustomColorExample from './examples/custom_color';
import DividerExample from './examples/divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider/Documentation',
  component: Divider,
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const SimpleUse: Story = {
  render: DividerExample,
};

export const CustomColor: Story = {
  render: CustomColorExample,
};
