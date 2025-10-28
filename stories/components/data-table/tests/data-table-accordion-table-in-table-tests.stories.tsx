import { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AnimationDurationTestExample, { tableInTableDefaultProps } from './examples/accordion-tests/accordion-duration';
import type { TableInTableProps } from './examples/accordion-tests/accordion-duration';
import AccordionInTableInTableExample, { tableInTableInTableProps } from './examples/accordion-tests/accordion-in-table-in-table';
import type { TableInTableInTableProps } from './examples/accordion-tests/accordion-in-table-in-table';
import type {
  AccordionWithFixedColumnProps,
} from './examples/accordion-tests/accordion-with-fixed-column';
import AccordionWithFixedColumnExample, { accordionWithFixedColumnDefaultProps } from './examples/accordion-tests/accordion-with-fixed-column';
import HorizontalScrollExample from './examples/accordion-tests/accordion-with-horizontal-scroll';
import AccordionWithInlineEditExample from './examples/accordion-tests/accordion-with-inline-edit';
import AccordionWithLinkExample from './examples/accordion-tests/accordion-with-link';
import AccordionWithRenderCellExample from './examples/accordion-tests/accordion-with-render-cell';
import AccordionWithMoreExample from './examples/accordion-tests/accrodion-with-more-interactive';
import AccordionWithSelectExample from './examples/accordion-tests/accrodion-with-select';
import ColoredAccordionExample from './examples/accordion-tests/colored-accordion';
import ColorCellsInAccordionExample from './examples/accordion-tests/colored-cells-in-accordion';
import TabeInTableAnimationTestExample, { accordionWithTablenProps } from './examples/accordion-tests/table-in-table-animation-test';
import type { AccordionWithTablenProps } from './examples/accordion-tests/table-in-table-animation-test';
import TabeInTableFixedColumnExample, { tableInTableFixedColumnDefaultProps } from './examples/accordion-tests/table-in-table-with-fixed-column';
import type { TableInTableFixedColumnProps } from './examples/accordion-tests/table-in-table-with-fixed-column';
import TabeInTableSortableExample from './examples/accordion-tests/table-in-table-with-sorting';
import type { AccordionWithButtonProps } from './examples/accordion-tests/with-component/button-not-in-cell-with-accordion';
import ButtonNotInCellWithAccordionExample, { accordionWithButtonDefaultProps } from './examples/accordion-tests/with-component/button-not-in-cell-with-accordion';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/AccordionTests',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const ButtonNotInCellWithAccordion: StoryObj<AccordionWithButtonProps> = {
  render: ButtonNotInCellWithAccordionExample,
  args: {
    ...accordionWithButtonDefaultProps,
  },
};

export const AnimationDurationTest: StoryObj<TableInTableProps> = {
  render: AnimationDurationTestExample,
  args: {
    ...tableInTableDefaultProps,
  },
};

export const TabeInTableAnimationTest: StoryObj<AccordionWithTablenProps> = {
  render: TabeInTableAnimationTestExample,
  argTypes: {
    justifyContent: {
      control: {
        type: 'select',
      },
      options: ['flex-start', 'flex-end', 'center'],
    },
  },
  args: {
    ...accordionWithTablenProps,
  },
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

export const AccordionWithFixedColumn: StoryObj<AccordionWithFixedColumnProps> = {
  render: AccordionWithFixedColumnExample,
  args: accordionWithFixedColumnDefaultProps,
};

export const TabeInTableFixedColumn: StoryObj<TableInTableFixedColumnProps> = {
  render: TabeInTableFixedColumnExample,
  args: {
    ...tableInTableFixedColumnDefaultProps,
  },
};

export const ColoredAccordion: Story = {
  render: ColoredAccordionExample,
};

export const ColorCellsInAccordion: Story = {
  render: ColorCellsInAccordionExample,
};

export const AccordionInTableInTable: StoryObj<TableInTableInTableProps> = {
  render: AccordionInTableInTableExample,
  args: {
    ...tableInTableInTableProps,
  },
};
