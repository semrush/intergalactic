import Card from '@semcore/card';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CardLayoutForSortableTablesExample from './examples/card_layout_for_tables';
import DifferentCardsExample from './examples/different-cards';

const meta: Meta<typeof Card> = {
  title: 'Components/Card/Tests',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const CardLayoutForSortableTables: Story = {
  render: CardLayoutForSortableTablesExample,
};

export const DifferentCards: Story = {
  render: DifferentCardsExample,
};
