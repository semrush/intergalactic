import Ellipsis from '@semcore/ellipsis';
import type { Meta, StoryObj } from '@storybook/react-vite';
export type ExampleEllipsisProps = EllipsisProps;

import TableWithLinksExample from './examples/in_table_with_link';
import OnChangePropsExample from './examples/on_change_props';
import TextCasesExample from './examples/text_cases';
import TrimWithTextSizeExample, { defaultProps as sizeEllipsisProps } from './examples/trim_with_special_text_size';

const meta: Meta<ExampleEllipsisProps> = {
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
type Story = StoryObj<typeof Ellipsis>;

export const TableWithLinks: Story = {
  render: TableWithLinksExample,
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
