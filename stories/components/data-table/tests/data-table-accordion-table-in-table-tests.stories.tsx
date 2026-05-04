import { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AccordionDurationExample, { accordionDurationDefaultProps } from './examples/accordion-tests/table-in-table/accordion-duration';
import type { AccordionDurationProps } from './examples/accordion-tests/table-in-table/accordion-duration';
import type { AccordionWithTablenProps } from './examples/accordion-tests/table-in-table/for-animation-and-justify-content-test';
import ForAnimationAndJustifyContentTestExample, { accordionWithTablenProps } from './examples/accordion-tests/table-in-table/for-animation-and-justify-content-test';
import type { TableInTableInTableProps } from './examples/accordion-tests/table-in-table/table-in-table-in-table';
import TableInTableInTableExample, { tableInTableInTableProps } from './examples/accordion-tests/table-in-table/table-in-table-in-table';
import type { TableInTableFixedColumnProps } from './examples/accordion-tests/table-in-table/with-fixed-column';
import WithFixedColumnExample, { tableInTableFixedColumnDefaultProps } from './examples/accordion-tests/table-in-table/with-fixed-column';
import WithSortingExample from './examples/accordion-tests/table-in-table/with-sorting';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/Accordion/Table in Table',
  component: DataTable,
};

export default meta;

type Story = StoryObj<typeof DataTable>;

export const AccordionDuration: StoryObj<AccordionDurationProps> = {
  render: AccordionDurationExample,
  args: {
    ...accordionDurationDefaultProps,
  },
};

export const ForAnimationAndJustifyContentTest: StoryObj<AccordionWithTablenProps> = {
  render: ForAnimationAndJustifyContentTestExample,
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

export const WithSorting: Story = {
  render: WithSortingExample,
};

export const WithFixedColumn: StoryObj<TableInTableFixedColumnProps> = {
  render: WithFixedColumnExample,
  args: {
    ...tableInTableFixedColumnDefaultProps,
  },
};

export const TableInTableInTable: StoryObj<TableInTableInTableProps> = {
  render: TableInTableInTableExample,
  args: {
    ...tableInTableInTableProps,
  },
};
