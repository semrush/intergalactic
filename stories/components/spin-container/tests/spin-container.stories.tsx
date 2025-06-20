import SpinContainer from '@semcore/spin-container';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CustomBackgroundExample from './examples/custom-background';
import OverInteractiveContentExample from './examples/over-interactive-cotent';
import SizesExample from './examples/sizes';

const meta: Meta<typeof SpinContainer> = {
  title: 'Components/SpinContainer/Tests',
  component: SpinContainer,
};

export default meta;
type Story = StoryObj<typeof SpinContainer>;

export const OverInteractiveContent: Story = {
  render: OverInteractiveContentExample,
};

export const CustomBackground: Story = {
  render: CustomBackgroundExample,
};

export const Sizes: Story = {
  render: SizesExample,
};
