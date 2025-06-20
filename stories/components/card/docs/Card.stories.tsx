import Card from '@semcore/card';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicExample from './examples/basic_example';
import CardLayoutForTablesExample from './examples/card_layout_for_tables';
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

export const CardLayoutForTables: Story = {
  render: CardLayoutForTablesExample,
};

export const Complex: Story = {
  render: ComplexExample,
};

export const Ellipsis: Story = {
  render: EllipsisExample,
};
