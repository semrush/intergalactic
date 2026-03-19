import { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import MultiLevelScrollInTableExample, { multiLevelScrollIntableProps } from './examples/scroll-tests/multi-level-scroll-in-table';
import type { MultiLevelScrollIntableProps } from './examples/scroll-tests/multi-level-scroll-in-table';
import MultiLevelWithFixedColumnExample, { fixedColumnMultiLevelScrollExampleProps } from './examples/scroll-tests/multi-level-with-fixed-column';
import type { FixedColumnMultiLevelScrollExampleProps } from './examples/scroll-tests/multi-level-with-fixed-column';
import OneLevelScrollInTableExample, { oneLevelScrollIntableProps } from './examples/scroll-tests/one-level-scroll-in-table';
import type { OneLevelScrollIntableProps } from './examples/scroll-tests/one-level-scroll-in-table';
import OneLevelWithFixedColumnExample, { fixedColumnScrollExampleProps } from './examples/scroll-tests/one-level-with-fixed-column';
import type { FixedColumnScrollExampleProps } from './examples/scroll-tests/one-level-with-fixed-column';
import ScrollWithStickyAndTopTopHeaderPropsExample, { defaultProps as ScrollTopHeaderProps } from './examples/scroll-tests/scroll-with-sticky-and-top-props-header';
import StickyHeaderAccordionExample from './examples/scroll-tests/sticky-header-accordion';
import StickyHeaderAsyncDataExample from './examples/scroll-tests/sticky-header-async-data';
import StickyHeaderScrollSyncExample, { defaultProps as StickyHeaderScrollSyncProps } from './examples/scroll-tests/sticky-header-scroll-sync';
import StickyHeaderSortingExample from './examples/scroll-tests/sticky-header-sorting';
import CaseWithW100Example from './examples/scroll-tests/w-100';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/Scroll',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const ScrollWithStickyAndTopTopHeaderProps: StoryObj<typeof ScrollTopHeaderProps> = {
  render: ScrollWithStickyAndTopTopHeaderPropsExample,
  argTypes: {
    loading: { control: 'boolean' },
  },
  args: ScrollTopHeaderProps,
};

export const OneLevelScrollInTable: StoryObj<OneLevelScrollIntableProps> = {
  render: OneLevelScrollInTableExample,
  args: {
    ...oneLevelScrollIntableProps,
  },
};

export const MultiLevelScrollInTable: StoryObj<MultiLevelScrollIntableProps> = {
  render: MultiLevelScrollInTableExample,
  args: {
    ...multiLevelScrollIntableProps,
  },
};

export const OneLevelWithFixedColumn: StoryObj<FixedColumnScrollExampleProps> = {
  render: OneLevelWithFixedColumnExample,
  args: {
    ...fixedColumnScrollExampleProps,
  },
};

export const MultiLevelWithFixedColumn: StoryObj<FixedColumnMultiLevelScrollExampleProps> = {
  render: MultiLevelWithFixedColumnExample,
  args: {
    ...fixedColumnMultiLevelScrollExampleProps,
  },
};

export const CaseWithW100: Story = {
  render: CaseWithW100Example,
};

export const StickyHeaderScrollSync: StoryObj<typeof StickyHeaderScrollSyncProps> = {
  render: StickyHeaderScrollSyncExample,
  args: StickyHeaderScrollSyncProps,
};

export const StickyHeaderAsyncData: Story = {
  render: StickyHeaderAsyncDataExample,
};

export const StickyHeaderAccordion: Story = {
  render: StickyHeaderAccordionExample,
};

export const StickyHeaderSorting: Story = {
  render: StickyHeaderSortingExample,
};
