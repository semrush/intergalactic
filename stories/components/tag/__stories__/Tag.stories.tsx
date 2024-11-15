import type { Meta, StoryObj } from '@storybook/react';
import Tag from '@semcore/tag';

import AddingTagExample from './docs-examples/adding_tag';
import CustomTagColorExample from './docs-examples/custom_tag_color';
import EditingTagExample from './docs-examples/editing_tag';
import GroupingTagsLessExample from './docs-examples/grouping_tags_less';
import GroupingTagsMoreExample from './docs-examples/grouping_tags_more';
import RemovingTagExample from './docs-examples/removing_tag';
import TagAddonExample from './docs-examples/tag_addon';

import { TagAddonSizesPositionsExample } from './components/TagAddonSizesPositionsExample';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const AddingTag: Story = {
  render: AddingTagExample,
};

export const CustomTagColor: Story = {
  render: CustomTagColorExample,
};

export const EditingTag: Story = {
  render: EditingTagExample,
};

export const GroupingTagsLess: Story = {
  render: GroupingTagsLessExample,
};

export const GroupingTagsMore: Story = {
  render: GroupingTagsMoreExample,
};

export const RemovingTag: Story = {
  render: RemovingTagExample,
};

export const TagAddon: Story = {
  render: TagAddonExample,
};

export const TagWithAddonSizesAndPositions: Story = {
  render: TagAddonSizesPositionsExample,
};
