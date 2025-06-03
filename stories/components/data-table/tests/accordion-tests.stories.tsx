
import type { Meta, StoryObj } from '@storybook/react';

import { DataTable } from '@semcore/data-table';

import AccordionWithRenderCellExample from './examples/accordion-tests/accordion-with-render-cell';
import AccordionWithInlineEditExample from './examples/accordion-tests/accordion-with-inline-edit';
import AccordionWithFixedColumnExample from './examples/accordion-tests/accordion-with-fixed-column';
import AccordionWithSelectExample from './examples/accordion-tests/accrodion-with-select';
import AccordionWithMoreExample from './examples/accordion-tests/accrodion-with-more-interactive';
import AccordionWithLinkExample from './examples/accordion-tests/accordion-with-link';
import AccordionWithChartAndButtonExample from './examples/accordion-tests/accordion-inside-table';
import TabeInTableFixedColumnExample from './examples/accordion-tests/table-in-table-with-fixed-column';
import HorizontalScrollExample from './examples/accordion-tests/accordion-with-horizontal-scroll';
import TabeInTableSortableExample from './examples/accordion-tests/table-in-table-with-sorting';
import ColoredAccordionExample from './examples/accordion-tests/colored-accordion';
import TabeInTableAnimationTestExample from './examples/accordion-tests/table-in-table-animation-test';
import AnimationDurationTestExample from './examples/accordion-tests/accordion-duration';


const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/AccordionTests',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const AccordionWithChartAndButton: Story = {
  render: AccordionWithChartAndButtonExample,
};

export const AnimationDurationTest: Story = {
  render: AnimationDurationTestExample,
};

export const TabeInTableAnimationTest: Story = {
  render: TabeInTableAnimationTestExample,
};

export const HorizontalScroll: Story = {
  render: HorizontalScrollExample,
};

export const AccordionWithMore: Story = {
  render: AccordionWithMoreExample,
};

export const AccordionWithLink: Story = {
  render: AccordionWithLinkExample,
};

export const AccordionWithSelect: Story = {
  render: AccordionWithSelectExample,
};

export const AccordionWithInlineEdit: Story = {
  render: AccordionWithInlineEditExample,
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