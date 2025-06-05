import { DataTable } from '@semcore/data-table';
import type { Meta, StoryObj } from '@storybook/react';

import FixedColumnDiffWidthExample from './examples/scroll-tests/fixed-column-with-d-ff-width';
import FixedColumnWithoutVerticalExample from './examples/scroll-tests/fixed-column-without-vertical';
import HorizontalScrollWithoutFixedExample from './examples/scroll-tests/horizontal-scroll';
import FixedGroupExample from './examples/scroll-tests/horizontal-scroll-fixed-group';
import MultipleScrollsExample from './examples/scroll-tests/multiple-scrolls';
import ScrollAndStickyExample from './examples/scroll-tests/scroll-in-table-sticky';
import ScrollTopHeaderExample from './examples/scroll-tests/scroll-in-top-header';

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
