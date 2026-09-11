import SpinContainer from '@semcore/ui/spin-container';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AllSizesExample from './examples/all-sizes';

const meta: Meta<typeof SpinContainer> = {
  title: 'Components/SpinContainer/Advanced',
  component: SpinContainer,
};

export default meta;

type Story = StoryObj<typeof SpinContainer>;

export const AllSizes: Story = {
  name: 'All Sizes',
  render: AllSizesExample,
};
