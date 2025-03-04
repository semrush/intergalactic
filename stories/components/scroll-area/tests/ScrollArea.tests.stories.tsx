import type { Meta, StoryObj } from '@storybook/react';
import ScrollArea from '@semcore/scroll-area';

import HorizontalScrollWithShadowAndOffsetExample from './examples/horizontal-scroll-with-shadow-and-offset';
import WithObserveParentSizeExample from './examples/with-observe-parent-size';
import VerticalScrollWithShadowAndOffseExample from './examples/vertical-scroll-with-shadow-and-offset';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea/Tests',
  component: ScrollArea,
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;


export const HorizontalScrollWithShadowAndOffset: Story = {
  render: HorizontalScrollWithShadowAndOffsetExample,
};

export const WithObserveParentSize: Story = {
  render: WithObserveParentSizeExample,
};

export const VerticalScrollWithShadowAndOffse: Story = {
  render: VerticalScrollWithShadowAndOffseExample,
};
