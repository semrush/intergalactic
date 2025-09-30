import { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import FixedColumnDiffWidthExample from './examples/scroll-tests/fixed-column-with-d-ff-width';
import FixedColumnWithoutVerticalExample from './examples/scroll-tests/fixed-column-without-vertical';
import HorizontalScrollWithoutFixedExample from './examples/scroll-tests/horizontal-scroll';
import FixedGroupExample from './examples/scroll-tests/horizontal-scroll-fixed-group';
import MultiLevelHorizontalScrollExample from './examples/scroll-tests/milti-level-horizontal-scroll';
import MultipleScrollsExample from './examples/scroll-tests/multiple-scrolls';
import ScrollAndStickyExample, { defaultProps as ScrollStickyProps } from './examples/scroll-tests/scroll-in-table-sticky';
import ScrollTopHeaderExample, { defaultProps as ScrollTopHeaderProps } from './examples/scroll-tests/scroll-in-top-header';
import CaseWithW100Example from './examples/scroll-tests/w-100';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/Scroll',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const FixedGroups: Story = {
  render: FixedGroupExample,
};

export const MultiLevelHorizontalScroll: Story = {
  render: MultiLevelHorizontalScrollExample,
};

export const ScrollWithTopStickyProps: StoryObj<typeof ScrollTopHeaderProps> = {
  render: ScrollTopHeaderExample,
  argTypes: {
    loading: { control: 'boolean' },
  },
  args: ScrollTopHeaderProps,
};

export const ScrollSticky: StoryObj<typeof ScrollStickyProps> = {
  render: ScrollAndStickyExample,
  argTypes: {
    loading: { control: 'boolean' },
  },
  args: ScrollStickyProps,
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

export const CaseWithW100: Story = {
  render: CaseWithW100Example,
};
