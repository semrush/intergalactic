import type { Meta, StoryObj } from '@storybook/react';
import Tag from '@semcore/tag';

import TagAddonSizesPositionsExample from './examples/tag_with_addon_all_sizes_positions';
import TagCircleAddonSizesExample from './examples/tag_with_circle_addon_all_sizes_positions';
import TagContainerAddonExample from './examples/tag_container_addon';
import TagTextCloseExample from './examples/tag_text_close';
const meta: Meta<typeof Tag> = {
  title: 'Components/Tag/Advanced',
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const TagWithAddonSizesAndPositions: Story = {
  render: TagAddonSizesPositionsExample,
};

export const TagWithCircleAddonSizesAndPositions: Story = {
  render: TagCircleAddonSizesExample,
};

export const TagContainerAddon: Story = {
  render: TagContainerAddonExample,
};

export const TagTextClose: Story = {
  render: TagTextCloseExample,
};
