import type { Meta, StoryObj } from '@storybook/react';

import Ellipsis from '@semcore/ellipsis';

import TableWithLinksExample from './examples/in_table_with_link';
import TextCasesExample from './examples/text_cases';
import OnChangePropsExample from './examples/on_change_props';


const meta: Meta<typeof Ellipsis> = {
  title: 'Components/Ellipsis/Tests',
  component: Ellipsis,
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
