import type { Meta, StoryObj } from '@storybook/react';
import ScrollArea from '@semcore/scroll-area';

import ScrollbarOutOfContainerExample from './examples/scrollbar_out_of_container';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea/Advanced Usage',
  component: ScrollArea,
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const ScrollbarOutOfContainer: Story = {
  render: ScrollbarOutOfContainerExample,
};
