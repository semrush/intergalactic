import InputTags from '@semcore/input-tags';
import type { Meta, StoryObj } from '@storybook/react-vite';

import EnteringAndEditingTagsDefaultValueExample from './examples/entering_and_editing_tags-default-value';
import EnteringAndEditingTagsExample from './examples/states';
import TagsWithAddonsExample from './examples/states-tags';

const meta: Meta<typeof InputTags> = {
  title: 'Components/InputTags/Tests',
  component: InputTags,
};

export default meta;
type Story = StoryObj<typeof InputTags>;

export const EnteringAndEditingTags: Story = {
  render: EnteringAndEditingTagsExample,
};

export const EnteringAndEditingTagsDefaultValue: Story = {
  render: EnteringAndEditingTagsDefaultValueExample,
};

export const TagsWithAddons: Story = {
  render: TagsWithAddonsExample,
};
