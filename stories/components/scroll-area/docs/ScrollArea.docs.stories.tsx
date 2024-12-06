import type { Meta, StoryObj } from '@storybook/react';
import ScrollArea from '@semcore/scroll-area';

import BasicUsageExample from './examples/basic_usage';
import DynamicVirtualListExample from './examples/dynamic_virtual_list';
import SynchronizedReverseScrollOnTwoDifferentScreensExample from './examples/synchronized_reverse_scroll_on_two_different_screens';
import SynchronizedScrollOnTwoDifferentScreensExample from './examples/synchronized_scroll_on_two_different_screens';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea/Documentation',
  component: ScrollArea,
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const BasicUsage: Story = {
  render: () => BasicUsageExample as unknown as React.ReactElement,
};

export const DynamicVirtualList: Story = {
  render: DynamicVirtualListExample,
};

export const SynchronizedReverseScrollOnTwoDifferentScreens: Story = {
  render: () =>
    SynchronizedReverseScrollOnTwoDifferentScreensExample as unknown as React.ReactElement,
};

export const SynchronizedScrollOnTwoDifferentScreens: Story = {
  render: () => SynchronizedScrollOnTwoDifferentScreensExample as unknown as React.ReactElement,
};
