import type { Meta, StoryObj } from '@storybook/react';
import Tag from '@semcore/tag';

import TagAddonSizesPositionsExample from './examples/tag_with_addon_all_sizes_positions';
import TagContainerAddonExample from './examples/tag_container_addon';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag/Advanced',
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const TagWithAddonSizesAndPositions: Story = {
  render: TagAddonSizesPositionsExample,
};

export const TagContainerAddon: Story = {
  render: TagContainerAddonExample,
};
