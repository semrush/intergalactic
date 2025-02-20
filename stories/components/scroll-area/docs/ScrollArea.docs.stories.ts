import type { Meta, StoryObj } from '@storybook/react';
import ScrollArea from '@semcore/scroll-area';

import BasicUsageExample from './examples/basic_usage';
import DynamicVirtualListExample from './examples/dynamic_virtual_list';
import SynchronizedReverseScrollOnTwoDifferentScreensExample from './examples/synchronized_reverse_scroll_on_two_different_screens';
import SynchronizedScrollOnTwoDifferentScreensExample from './examples/synchronized_scroll_on_two_different_screens';

import TestExample from './examples/test';
import Test2Example from './examples/test2';
import Test3Example from './examples/test3';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea/Documentation',
  component: ScrollArea,
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const BasicUsage: Story = {
  render: BasicUsageExample,
};

export const Test: Story = {
  render: TestExample,
};

export const Test2: Story = {
  render: Test2Example,
};

export const Test3: Story = {
  render: Test3Example,
};

export const DynamicVirtualList: Story = {
  render: DynamicVirtualListExample,
};

export const SynchronizedReverseScrollOnTwoDifferentScreens: Story = {
  render: SynchronizedReverseScrollOnTwoDifferentScreensExample,
};

export const SynchronizedScrollOnTwoDifferentScreens: Story = {
  render: SynchronizedScrollOnTwoDifferentScreensExample,
};
