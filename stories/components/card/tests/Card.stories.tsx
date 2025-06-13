import Card from '@semcore/card';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CardLayoutForTablesExample from './examples/card_layout_for_tables';

const meta: Meta<typeof Card> = {
  title: 'Components/Card/Tests',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const CardLayoutForTables: Story = {
  render: CardLayoutForTablesExample,
};
