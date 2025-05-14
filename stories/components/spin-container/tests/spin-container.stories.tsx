import type { Meta, StoryObj } from '@storybook/react';
import SpinContainer from '@semcore/spin-container';

import OverInteractiveContentExample from './examples/over-interactive-cotent';
import SizesExample from './examples/sizes';

import CustomBackgroundExample from './examples/custom-background';

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


