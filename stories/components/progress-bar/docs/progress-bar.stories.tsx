import ProgressBar from '@semcore/ui/progress-bar';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/basic-usage';
import CustomizingTheBarExample, { defaultProps as CustomizingTheBarProps } from './examples/customizing_the_bar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar/Documentation',
  component: ProgressBar,
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const BasicUsage: Story = {
  render: BasicUsageExample,
};

export const CustomizingTheBar: StoryObj<typeof CustomizingTheBarProps> = {
  render: CustomizingTheBarExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l'],
    },
    theme: {
      control: { type: 'select' },
      options: ['default', 'invert', 'violet-100'],
    },
    value: {
      control: { type: 'number' },
    },
  },
  args: CustomizingTheBarProps,
};
