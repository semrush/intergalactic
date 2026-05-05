import Divider from '@semcore/ui/divider';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AllThemesExample from './examples/all-themes';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider/Advanced',
  component: Divider,
};

export default meta;

export const AllThemes: StoryObj = {
  name: 'All themes',
  render: AllThemesExample,
};
