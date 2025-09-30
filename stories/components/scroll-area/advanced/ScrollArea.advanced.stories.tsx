import ScrollArea from '@semcore/ui/scroll-area';
import type { Meta, StoryObj } from '@storybook/react-vite';

import RelativeContainerHeightExample from './examples/relative_container_height';
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

export const RelativeContainerHeight: Story = {
  render: RelativeContainerHeightExample,
};
