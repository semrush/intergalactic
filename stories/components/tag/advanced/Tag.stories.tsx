import Tag from '@semcore/ui/tag';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AllTagsExample from './examples/all-tags';
import TagContainerAddonExample from './examples/tag_container_addon';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag/Advanced',
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const AllTags: Story = {
  name: 'All Tags',
  render: AllTagsExample,
};

export const TagContainerAddon: Story = {
  render: TagContainerAddonExample,
};
