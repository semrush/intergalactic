import type { EllipsisProps } from '@semcore/ellipsis';
import Ellipsis from '@semcore/ellipsis';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TableWithLinksExample from './examples/in_table_with_link';
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

export const TableWithLinks: StoryObj<EllipsisProps> = {
  render: TableWithLinksExample,
};

export const TextCases: StoryObj<EllipsisProps> = {
  render: TextCasesExample,
};

export const OnChangeProps: StoryObj<EllipsisProps> = {
  render: OnChangePropsExample,
};

export const TrimWithTextSize: StoryObj<EllipsisProps> = {
  render: TrimWithTextSizeExample,
  args: sizeEllipsisProps,
};
