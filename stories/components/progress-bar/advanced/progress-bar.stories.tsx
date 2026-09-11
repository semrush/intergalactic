import ProgressBar from '@semcore/ui/progress-bar';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AllThemesExample from './examples/all_themes';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar/Advanced',
  component: ProgressBar,
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const all_themes: Story = {
  name: 'All themes',
  render: AllThemesExample,
};
