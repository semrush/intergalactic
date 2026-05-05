import Dot from '@semcore/ui/dot';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AllDotsExample from './examples/all-dots';

const meta: Meta<typeof Dot> = {
  title: 'Components/Dot/Advanced',
  component: Dot,
};

export default meta;

export const AllDots: StoryObj = {
  name: 'All dots',
  render: AllDotsExample,
};
