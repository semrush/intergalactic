
import type { Meta, StoryObj } from '@storybook/react';

import { DataTable } from '@semcore/data-table';

import AccordionWithRenderCellExample from './examples/accordion-tests/accordion-with-render-cell';
import AccordionWithFixedColumnExample from './examples/accordion-tests/accordion-with-fixed-column';
import TabeInTableFixedColumnExample from './examples/accordion-tests/table-in-table-with-fixed-column';
import HorizontalScrollExample from './examples/accordion-tests/accordion-with-horizontal-scroll';
import TabeInTableSortableExample from './examples/accordion-tests/table-in-table-with-sorting';
import ColoredAccordionExample from './examples/accordion-tests/colored-accordion';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/AccordionTests',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const HorizontalScroll: Story = {
  render: HorizontalScrollExample,
};

export const TabeInTableSortable: Story = {
  render: TabeInTableSortableExample,
};

export const AccordionWithRenderCell: Story = {
  render: AccordionWithRenderCellExample,
};

export const AccordionWithFixedColumn: Story = {
  render: AccordionWithFixedColumnExample,
};

export const TabeInTableFixedColumn: Story = {
  render: TabeInTableFixedColumnExample,
};

export const ColoredAccordion: Story = {
  render: ColoredAccordionExample,
};