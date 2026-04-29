import Card from '@semcore/ui/card';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicExample from './examples/basic_example';
import type { TableInCardProps } from './examples/card_layout_for_tables';
import CardLayoutForTablesExample, { tableInCardDefaultProps } from './examples/card_layout_for_tables';
import ComplexExample from './examples/complex_example';
import EllipsisExample from './examples/ellipsis';
const meta: Meta<typeof Card> = {
  title: 'Components/Card/Documentation',
  component: Card,
};
export default meta;
type Story = StoryObj<typeof Card>;
export const Basic: Story = {
  render: BasicExample,

};
export const Complex: Story = {
  render: ComplexExample,

};
export const Ellipsis: Story = {
  render: EllipsisExample,

};
export const CardLayoutForTables: StoryObj<TableInCardProps> = {
  render: CardLayoutForTablesExample,
  args: {
    ...tableInCardDefaultProps,
  },
  argTypes: {
    use: {
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary', undefined],
    },
    variant: {
      control: {
        type: 'select',
      },
      options: ['card', 'default'],
    },
    compact: {
      control: {
        type: 'select',
      },
      options: [true, undefined],
    },
  },

};
