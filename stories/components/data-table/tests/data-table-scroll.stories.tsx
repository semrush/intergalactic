
import type { Meta, StoryObj } from '@storybook/react';

import { DataTable } from '@semcore/data-table';


import ScrollAndStickyExample from './examples/scroll-tests/scroll-in-table-sticky';
import HorizontalScrollWithoutFixedExample from './examples/scroll-tests/horizontal-scroll';
import FixedGroupExample from './examples/scroll-tests/horizontal-scroll-fixed-group';
import MultipleScrollsExample from './examples/scroll-tests/multiple-scrolls';
import FixedColumnDiffWidthExample from './examples/scroll-tests/fixed-column-with-d-ff-width';
import ScrollTopHeaderExample from './examples/scroll-tests/scroll-in-top-header';
import FixedColumnWithoutVerticalExample from './examples/scroll-tests/fixed-column-without-vertical';


const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/Scroll',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const FixedGroups: Story = {
  render: FixedGroupExample,
};

export const ScrollWithTopStickyProps: Story = {
  render: ScrollTopHeaderExample,
};

export const ScrollWithStickyProps: Story = {
  render: ScrollAndStickyExample,
};

export const ThreeScrolls: Story = {
  render: MultipleScrollsExample,
};

export const HorizontalScrollsWithoutFixedColmns: Story = {
  render: HorizontalScrollWithoutFixedExample,
};

export const HorizontalScrollWithFixedColumnAndDiffWidth: Story = {
  render: FixedColumnDiffWidthExample,
};

export const FixedColumnWithoutVertical: Story = {
  render: FixedColumnWithoutVerticalExample,
};