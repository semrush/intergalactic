import Card from '@semcore/ui/card';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CardLayoutForSortableTablesExample from './examples/card_layout_for_tables';
import CardWithDescriptionTooltipInBodyExample from './examples/card_with_description_tooltip_in_body';
import DifferentCardsExample from './examples/different-cards';
import type { TableInCardProps } from './examples/table-with-accordions-in-card';
import TableWithAccordionsInCardExample, { tableInCardDefaultProps } from './examples/table-with-accordions-in-card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card/Tests',
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const CardLayoutForSortableTables: Story = {
  render: CardLayoutForSortableTablesExample,
};

export const CardWithDescriptionTooltipInBody: Story = {
  render: CardWithDescriptionTooltipInBodyExample,
};

export const DifferentCards: Story = {
  render: DifferentCardsExample,
};

export const TableWithAccordionsInCard: StoryObj<TableInCardProps> = {
  render: TableWithAccordionsInCardExample,
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
