import type { Meta, StoryObj } from '@storybook/react';

import Icon from '@semcore/icon';

import BasicUsageExample from './examples/basic-usage';
import CustomColorExample from './examples/custom-color';

const meta: Meta<typeof Icon> = {
  title: 'Components/Illustration/Documentation',
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const BasicUsage: Story = {
  render: BasicUsageExample,
};

export const CustomColor: Story = {
  render: CustomColorExample,
};
