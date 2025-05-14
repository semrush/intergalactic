import type { Meta, StoryObj } from '@storybook/react';

import Dot from '@semcore/dot';

import DotAnimationExample from './examples/different-sizes-and-positions';
import DotLinkExample from './examples/different-sizes-and-positions-link';
import DotPillExample from './examples/different-sizes-and-positions-pill';
import LinkTriggerExample from './examples/different-sizes-and-positions copy';


const meta: Meta<typeof Dot> = {
  title: 'Components/Dot/Tests',
  component: Dot,
};

export default meta;
type Story = StoryObj<typeof Dot>;

export const DotAnimation: Story = {
  render: DotAnimationExample,
};

export const DotLink: Story = {
  render: DotLinkExample,
};

export const DotPill: Story = {
  render: DotPillExample,
};

export const LinkTrigger: Story = {
  render: LinkTriggerExample,
};
