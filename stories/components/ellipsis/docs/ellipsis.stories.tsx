import Ellipsis, { type EllipsisProps } from '@semcore/ui/ellipsis';
import type { Meta, StoryObj } from '@storybook/react-vite';
export type ExampleEllipsisProps = EllipsisProps;

import AdvancedUseExample, { defaultProps as advancedDefaultProps } from './examples/advanced_use';
import BasicUsageExample, { defaultProps as basicDefaultProps } from './examples/basic_usage';
import BreadcrumbsExample from './examples/breadcrumbs';
import CardExample from './examples/card';
import DataTableExample from './examples/data-table';
import InputTagsExample, { defaultProps as inputTagsDefaultProps } from './examples/input-tags';
import MultilineExample, { defaultProps as multilineDefaultProps } from './examples/multiline';
import MultipleUseExample, { defaultProps as multipleUseProps } from './examples/multiple_use';
import TooltipCursorAnchoringExample, { defaultProps as tooltipCursorAnchoringProps } from './examples/tooltip-cursor-anchoring';
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
  args: multipleUseProps,
};

export const TooltipCursorAnchoring: Story = {
  render: TooltipCursorAnchoringExample,
  args: tooltipCursorAnchoringProps,
};

export const Breadcrumbs: Story = {
  render: BreadcrumbsExample,
};

export const CardEllipsis: Story = {
  render: CardExample,
};

export const DataTableEllipsis: Story = {
  render: DataTableExample,
};

export const InputTags: Story = {
  render: InputTagsExample,
  args: inputTagsDefaultProps,
};

export const TrimmingType: Story = {
  render: TrimmingTypeExample,
};
