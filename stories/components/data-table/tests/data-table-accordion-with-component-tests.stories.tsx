import { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import ColoredParentCellsExample from './examples/accordion-tests/with-component/colored-parent-cells';
import ThemedParentRowsExample from './examples/accordion-tests/with-component/themed-parent-rows';
import type { AccordionWithButtonExampleProps } from './examples/accordion-tests/with-component/with-button-not-in-accordion-cell';
import ButtonNotInCellWithAccordionExample, { accordionWithButtonDefaultProps } from './examples/accordion-tests/with-component/with-button-not-in-accordion-cell';
import type { AccordionWithFixedColumnProps } from './examples/accordion-tests/with-component/with-fixed-column';
import WithFixedColumnExample, { accordionWithFixedColumnDefaultProps } from './examples/accordion-tests/with-component/with-fixed-column';
import WithHorizontalScrollExample, { accordionWithHorizontalScrollExampleProps } from './examples/accordion-tests/with-component/with-horizontal-scroll';
import type { AccordionWithHorizontalScrollExampleProps } from './examples/accordion-tests/with-component/with-horizontal-scroll';
import WithInteractiveElementsInCellWithToggleExample from './examples/accordion-tests/with-component/with-interactive-elements-in-cell-with-toggle';
import WithRenderCellExample from './examples/accordion-tests/with-component/with-render-cell';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/Accordion/With Component',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const ButtonNotInCellWithAccordion: StoryObj<AccordionWithButtonExampleProps> = {
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

export const WithHorizontalScroll: StoryObj<AccordionWithHorizontalScrollExampleProps> = {
  render: WithHorizontalScrollExample,
  args: {
    ...accordionWithHorizontalScrollExampleProps,
  },
};

export const WithRenderCell: Story = {
  render: WithRenderCellExample,
};

export const ThemedParentRows: Story = {
  render: ThemedParentRowsExample,
};

export const ColoredParentCells: Story = {
  render: ColoredParentCellsExample,
};

export const WithInteractiveElementsInCellWithToggle: Story = {
  render: WithInteractiveElementsInCellWithToggleExample,
};
