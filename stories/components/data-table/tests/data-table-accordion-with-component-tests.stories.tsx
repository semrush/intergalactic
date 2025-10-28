import { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import type { AccordionWithButtonProps } from './examples/accordion-tests/with-component/with-button-not-in-accordion-cell';
import ButtonNotInCellWithAccordionExample, { accordionWithButtonDefaultProps } from './examples/accordion-tests/with-component/with-button-not-in-accordion-cell';
import type { AccordionWithFixedColumnProps } from './examples/accordion-tests/with-component/with-fixed-column';
import WithFixedColumnExample, { accordionWithFixedColumnDefaultProps } from './examples/accordion-tests/with-component/with-fixed-column';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/Accordion/With Component',
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

export const WithFixedColumn: StoryObj<AccordionWithFixedColumnProps> = {
  render: WithFixedColumnExample,
  args: {
    ...accordionWithFixedColumnDefaultProps,
  },
};
