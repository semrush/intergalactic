import type { Meta, StoryObj } from '@storybook/react';
import Tag from '@semcore/tag';

import AddingTagExample from './examples/adding_tag';
import CustomTagColorExample from './examples/custom_tag_color';
import EditingTagExample from './examples/editing_tag';
import GroupingTagsLessExample from './examples/grouping_tags_less';
import GroupingTagsMoreExample from './examples/grouping_tags_more';
import RemovingTagExample from './examples/removing_tag';
import TagAddonExample from './examples/tag_addon';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag/Documentation',
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
