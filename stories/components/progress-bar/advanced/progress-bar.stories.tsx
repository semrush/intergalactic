import ProgressBar from '@semcore/progress-bar';
import type { Meta, StoryObj } from '@storybook/react-vite';

import ComplexUsageExample from './examples/complex_usage_example';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar/Advanced',
  component: ProgressBar,
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const ComplexUsage: Story = {
  render: ComplexUsageExample,
};
