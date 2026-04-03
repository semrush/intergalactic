import type { EllipsisProps } from '@semcore/ui/ellipsis';
import Ellipsis from '@semcore/ui/ellipsis';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TableWithLinksExample, { defaultProps as ellipsisInTableDefaultProps } from './examples/in_table_with_link';
import MultipleTagsInOneComponentsExample from './examples/multiple_tags_in_one_components';
import OnChangePropsExample from './examples/on_change_props';
import TextCasesExample from './examples/text_cases';
import TrimWithTextSizeExample, { defaultProps as sizeEllipsisProps } from './examples/trim_with_special_text_size';

const meta: Meta<EllipsisProps> = {
  title: 'Components/Ellipsis/Tests',
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
type Story = StoryObj<EllipsisProps>;

export const TableWithLinks: Story = {
  render: TableWithLinksExample,
  args: ellipsisInTableDefaultProps,

};

export const TextCases: Story = {
  render: TextCasesExample,
};

export const OnChangeProps: Story = {
  render: OnChangePropsExample,
};

export const TrimWithTextSize: Story = {
  render: TrimWithTextSizeExample,
  args: sizeEllipsisProps,
};

export const MultipleTagsInOneComponents: Story = {
  render: MultipleTagsInOneComponentsExample,
};
