import Spin from '@semcore/ui/spin';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AllSizesExample from './examples/all-sizes';

const meta: Meta<typeof Spin> = {
  title: 'Components/Spin/Advanced',
  component: Spin,
};

export default meta;

type Story = StoryObj<typeof Spin>;

export const AllSizes: Story = {
  name: 'All Sizes',
  render: AllSizesExample,
};
