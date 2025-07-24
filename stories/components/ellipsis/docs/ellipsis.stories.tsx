import Ellipsis, { type EllipsisProps } from '@semcore/ellipsis';
import type { Meta, StoryObj } from '@storybook/react-vite';
export type ExampleEllipsisProps = EllipsisProps;

import AdvancedUseExample, { defaultProps as advancedDefaultProps } from './examples/advanced_use';
import BasicUsageExample, { defaultProps as basicDefaultProps } from './examples/basic_usage';
import MultilineExample, { defaultProps as multilineDefaultProps } from './examples/multiline';
import MultipleUseExample from './examples/multiple_use';
import TooltipCursorAnchoringExample from './examples/tooltip-cursor-anchoring';
import TrimmingTypeExample from './examples/trimming_type';

const meta: Meta<ExampleEllipsisProps> = {
  title: 'Components/Ellipsis/Documentation',
  component: Ellipsis,
  argTypes: {
    trim: {
      control: { type: 'select' },
      options: ['end', 'middle'],
    },
    tooltip: {
      control: { type: 'boolean' },
    },
    maxLine: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<ExampleEllipsisProps>;

export const AdvancedUse: Story = {
  render: AdvancedUseExample,
  args: advancedDefaultProps,
};

export const BasicUsage: Story = {
  render: BasicUsageExample,
  args: basicDefaultProps,
};

export const Multiline: Story = {
  render: MultilineExample,
  args: multilineDefaultProps,
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
