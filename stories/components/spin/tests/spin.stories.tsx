import Spin from '@semcore/ui/spin';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AllSizesExample from './examples/all-sizes';
import SpinBoxPropsExample from './examples/spin-box-props';
import SpinCenteredExample from './examples/spin-centered';
import SpinCustomThemeExample from './examples/spin-custom-theme';
import SpinSizesExample from './examples/spin-sizes';
import SpinSizesBottomTextExample from './examples/spin-sizes-bottom-text';
import SpinThemeExample from './examples/spin-theme';

const meta: Meta<typeof Spin> = {
  title: 'Components/Spin/Tests',
  component: Spin,
};

export default meta;
type Story = StoryObj<typeof Spin>;

export const AllSizes: Story = {
  name: 'All Sizes',
  render: AllSizesExample,
};

export const SpinSizes: Story = {
  render: SpinSizesExample,
};

export const SpinBoxProps: Story = {
  render: SpinBoxPropsExample,
};

export const SpinSizesBottomText: Story = {
  render: SpinSizesBottomTextExample,
};

export const SpinCentered: Story = {
  render: SpinCenteredExample,
};

export const SpinTheme: Story = {
  render: SpinThemeExample,
};

export const SpinCustomTheme: Story = {
  render: SpinCustomThemeExample,
};
