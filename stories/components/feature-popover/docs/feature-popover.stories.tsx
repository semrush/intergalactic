import type { Meta, StoryObj } from '@storybook/react';

import FeaturePopover from '@semcore/feature-popover';
import FeaturePopoverExample from './examples/Basic';

const meta: Meta<typeof FeaturePopover> = {
  title: 'Components/FeaturePopover',
  component: FeaturePopover,
};

export default meta;
type Story = StoryObj<typeof FeaturePopover>;

export const AnimationExample: Story = {
  render: FeaturePopoverExample,
};
