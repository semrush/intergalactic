import Counter from '@semcore/ui/counter';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AllThemesExample from './examples/all-themes';

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter/Advanced',
  component: Counter,
};

export default meta;

export const AllThemes: StoryObj = {
  name: 'All themes',
  render: AllThemesExample,
};
