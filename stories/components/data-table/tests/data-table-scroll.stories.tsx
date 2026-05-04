import { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CampaingsTableExample from './examples/scroll-tests/campaigns-table';
import FolderTableExample from './examples/scroll-tests/folder-table';
import RealTableExample from './examples/scroll-tests/real-table';
import ScrollInTableExample, { defaultProps as scrollInTableDefaultProps } from './examples/scroll-tests/scroll-in-table';
import type { ScrollInTableProps } from './examples/scroll-tests/scroll-in-table';
import ScrollWithStickyAndTopTopHeaderPropsExample, { defaultProps as ScrollTopHeaderProps } from './examples/scroll-tests/scroll-with-sticky-and-top-props-header';
import StickyHeaderAccordionExample, { defaultProps as StickyHeaderAccordionDefaultProps } from './examples/scroll-tests/sticky-header-accordion';
import type { StickyHeaderAccordionProps } from './examples/scroll-tests/sticky-header-accordion';
import StickyHeaderDynamicDataExample, { defaultProps as StickyHeaderDynamicDataDefaultProps } from './examples/scroll-tests/sticky-header-dynamic-data';
import type { StickyHeaderDynamicDataProps } from './examples/scroll-tests/sticky-header-dynamic-data';
import StickyHeaderHiddenColumnExample from './examples/scroll-tests/sticky-header-hidden-column';
import StickyHeaderLoadingFocusExample, { defaultProps as StickyHeaderLoadingFocusDefaultProps } from './examples/scroll-tests/sticky-header-loading-focus';
import type { StickyHeaderLoadingFocusProps } from './examples/scroll-tests/sticky-header-loading-focus';
import StickyHeaderScrollSyncExample, { defaultProps as StickyHeaderScrollSyncDefaultProps } from './examples/scroll-tests/sticky-header-scroll-sync';
import type { StickyHeaderScrollSyncProps } from './examples/scroll-tests/sticky-header-scroll-sync';
import StickyHeaderSortingExample, { defaultProps as StickyHeaderSortingDefaultProps } from './examples/scroll-tests/sticky-header-sorting';
import type { StickyHeaderSortingProps } from './examples/scroll-tests/sticky-header-sorting';
import CaseWithW100Example from './examples/scroll-tests/w-100';
import WithFixedColumnExample, { defaultProps as withFixedColumnDefaultProps } from './examples/scroll-tests/with-fixed-column';
import type { WithFixedColumnProps } from './examples/scroll-tests/with-fixed-column';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/Scroll',
  component: DataTable,
};

export default meta;

type Story = StoryObj<typeof DataTable>;

export const ScrollInTable: StoryObj<ScrollInTableProps> = {
  render: ScrollInTableExample,
  argTypes: {
    multiLevel: { control: 'boolean' },
    sticky: { control: 'boolean' },
    withScrollBar: { control: 'boolean' },
    h: { control: 'text' },
    wMax: { control: 'text' },
    loading: { control: 'boolean' },
    compact: { control: 'boolean' },
    defaultGridTemplateColumnWidth: { control: 'select', options: ['auto', 'min-content', 'max-content', '100px', '150px', '200px', '1fr'] },
  },
  args: {
    ...scrollInTableDefaultProps,
  },
};

export const WithFixedColumn: StoryObj<WithFixedColumnProps> = {
  render: WithFixedColumnExample,
  argTypes: {
    multiLevel: { control: 'boolean' },
    sticky: { control: 'boolean' },
    withScrollBar: { control: 'boolean' },
    h: { control: 'text' },
    wMax: { control: 'text' },
    loading: { control: 'boolean' },
    compact: { control: 'boolean' },
    defaultGridTemplateColumnWidth: { control: 'select', options: ['auto', 'min-content', 'max-content', '100px', '150px', '200px', '1fr'] },
  },
  args: {
    ...withFixedColumnDefaultProps,
  },
};

export const ScrollWithStickyAndTopTopHeaderProps: StoryObj<typeof ScrollTopHeaderProps> = {
  render: ScrollWithStickyAndTopTopHeaderPropsExample,
  argTypes: {
    loading: { control: 'boolean' },
  },
  args: ScrollTopHeaderProps,
};

export const StickyHeaderScrollSync: StoryObj<StickyHeaderScrollSyncProps> = {
  render: StickyHeaderScrollSyncExample,
  argTypes: {
    sticky: { control: 'boolean' },
    withScrollBar: { control: 'boolean' },
    multiLevel: { control: 'boolean' },
    limitEnabled: { control: 'boolean', name: 'Limit overlay' },
    rowsLimit: { control: { type: 'number', min: 0, max: 6 }, if: { arg: 'limitEnabled' } },
    columnsLimit: { control: { type: 'number', min: 0, max: 5 }, if: { arg: 'limitEnabled' } },
  },
  args: {
    ...StickyHeaderScrollSyncDefaultProps,
  },
};

export const StickyHeaderDynamicData: StoryObj<StickyHeaderDynamicDataProps> = {
  render: StickyHeaderDynamicDataExample,
  argTypes: {
    sticky: { control: 'boolean' },
    withScrollBar: { control: 'boolean' },
    wMax: { control: 'text' },
  },
  args: {
    ...StickyHeaderDynamicDataDefaultProps,
  },
};

export const StickyHeaderAccordion: StoryObj<StickyHeaderAccordionProps> = {
  render: StickyHeaderAccordionExample,
  argTypes: {
    sticky: { control: 'boolean' },
    withScrollBar: { control: 'boolean' },
    accordionMode: { control: 'select', options: ['independent', 'toggle'] },
  },
  args: {
    ...StickyHeaderAccordionDefaultProps,
  },
};

export const StickyHeaderSorting: StoryObj<StickyHeaderSortingProps> = {
  render: StickyHeaderSortingExample,
  argTypes: {
    sticky: { control: 'boolean' },
    withScrollBar: { control: 'boolean' },
    fixedFirstColumn: { control: 'boolean' },
    fixedLastColumn: { control: 'boolean' },
    wMax: { control: 'text' },
  },
  args: {
    ...StickyHeaderSortingDefaultProps,
  },
};

export const StickyHeaderLoadingFocus: StoryObj<StickyHeaderLoadingFocusProps> = {
  render: StickyHeaderLoadingFocusExample,
  argTypes: {
    sticky: { control: 'boolean' },
    withScrollBar: { control: 'boolean' },
    wMax: { control: 'text' },
  },
  args: {
    ...StickyHeaderLoadingFocusDefaultProps,
  },
};

// Real examples
export const FolderTable: StoryObj<{ loading: boolean }> = {
  render: FolderTableExample,
  argTypes: {
    loading: { control: 'boolean' },
  },
  args: {
    loading: false,
  },
};

export const RealTable: Story = {
  render: RealTableExample,
};

export const CaseWithW100: Story = {
  render: CaseWithW100Example,
};

export const CampaingsTable: Story = {
  render: CampaingsTableExample,
};

export const StickyHeaderHiddenColumn: Story = {
  render: StickyHeaderHiddenColumnExample,
};
