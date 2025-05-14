import type { Meta, StoryObj } from '@storybook/react';

import Divider from '@semcore/divider';

import UseAndThemePairsExample from './examples/use-theme-variations';
import OrientationUseAndThemePairsExample from './examples/orientation-use-theme-variations';
import RenderInCenterExample from './examples/render-in-center';
import BoxPropsExample from './examples/box-props';


const meta: Meta<typeof Divider> = {
  title: 'Components/Divider/Tests',
  component: Divider,
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const UseAndThemePairs: Story = {
  render: UseAndThemePairsExample,
};

export const OrientationUseAndThemePairs: Story = {
  render: OrientationUseAndThemePairsExample,
};

export const RenderInCenter: Story = {
  render: RenderInCenterExample,
};

export const BoxProps: Story = {
  render: BoxPropsExample,
};
