
import type { Meta, StoryObj } from '@storybook/react';

import { DataTable } from '@semcore/data-table';


import ScrollAndStickyExample from './examples/scroll-tests/scroll-in-table-sticky';
import HorizontalScrollWithoutFixedExample from './examples/scroll-tests/horizontal-scroll';
import FixedGroupExample from './examples/scroll-tests/horizontal-scroll-fixed-group';
import MultipleScrollsExample from './examples/scroll-tests/multiple-scrolls';
import FixedColumnDiffWidthExample from './examples/scroll-tests/fixed-column-with-d-ff-width';


const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/Scroll',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const FixedGroup: Story = {
  render: FixedGroupExample,
};

export const ScrollSticky: Story = {
  render: ScrollAndStickyExample,
};

export const MultipleScrolls: Story = {
  render: MultipleScrollsExample,
};

export const HorizontalScrollWithoutFixed: Story = {
  render: HorizontalScrollWithoutFixedExample,
};

export const FixedColumnDiffWidth: Story = {
  render: FixedColumnDiffWidthExample,
};
