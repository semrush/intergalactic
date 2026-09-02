import ProgressBar from '@semcore/ui/progress-bar';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/basic-usage';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar/Documentation',
  component: ProgressBar,
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const BasicUsage: Story = {
  render: BasicUsageExample,
};
