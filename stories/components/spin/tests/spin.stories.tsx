import type { Meta, StoryObj } from '@storybook/react';
import Spin from '@semcore/spin';

import SpinSizesExample from './examples/spin-sizes';
import SpinSizesBottomTextExample from './examples/spin-sizes-bottom-text';
import SpinCenteredExample from './examples/spin-centered';
import SpinThemeExample from './examples/spin-theme';
import SpinCustomThemeExample from './examples/spin-custom-theme';
import SpinBoxPropsExample from './examples/spin-box-props';


const meta: Meta<typeof Spin> = {
  title: 'Components/Spin/Tests',
  component: Spin,
};

export default meta;
type Story = StoryObj<typeof Spin>;

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