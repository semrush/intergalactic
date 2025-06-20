import ProgressBar from '@semcore/progress-bar';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/basic-usage';
import CustomizingTheBarExample from './examples/customizing_the_bar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar/Documentation',
  component: ProgressBar,
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const BasicUsage: Story = {
  render: BasicUsageExample,
};

export const CustomizingTheBar: Story = {
  render: CustomizingTheBarExample,
};
