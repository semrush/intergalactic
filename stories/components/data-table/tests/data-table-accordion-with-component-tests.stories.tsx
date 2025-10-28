import { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import type { AccordionWithButtonProps } from './examples/accordion-tests/with-component/button-not-in-cell-with-accordion';
import ButtonNotInCellWithAccordionExample, { accordionWithButtonDefaultProps } from './examples/accordion-tests/with-component/button-not-in-cell-with-accordion';

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
