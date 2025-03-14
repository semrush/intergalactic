import type { Meta, StoryObj } from '@storybook/react';

import Ellipsis from '@semcore/ellipsis';

import AdvancedUseExample from './examples/advanced_use';
import BasicUsageExample from './examples/basic_usage';
import MultilineExample from './examples/multiline';
import MultipleUseExample from './examples/multiple_use';
import TooltipCursorAnchoringExample from './examples/tooltip-cursor-anchoring';
import TrimmingTypeExample from './examples/trimming_type';

const meta: Meta<typeof Ellipsis> = {
  title: 'Components/Ellipsis/Documentation',
  component: Ellipsis,
};

export default meta;
type Story = StoryObj<typeof Ellipsis>;

export const AdvancedUse: Story = {
  render: AdvancedUseExample,
};

export const BasicUsage: Story = {
  render: BasicUsageExample,
};

export const Multiline: Story = {
  render: MultilineExample,
};

export const MultipleUse: Story = {
  render: MultipleUseExample,
};

export const TooltipCursorAnchoring: Story = {
  render: TooltipCursorAnchoringExample,
};

export const TrimmingType: Story = {
  render: TrimmingTypeExample,
};
