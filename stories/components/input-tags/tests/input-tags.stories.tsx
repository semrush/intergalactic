import InputTags from '@semcore/input-tags';
import type { Meta, StoryObj } from '@storybook/react-vite';

import EnteringAndEditingTagsDefaultValueExample from './examples/entering_and_editing_tags-default-value';
import EnteringAndEditingTagsDelimitersExample from './examples/entering_and_editing_tags-delimiters';
import TagsStatesExample from './examples/states';
import TagsWithAddonsExample from './examples/states-tags';

const meta: Meta<typeof InputTags> = {
  title: 'Components/InputTags/Tests',
  component: InputTags,
};

export default meta;
type Story = StoryObj<typeof InputTags>;

export const TagsStates: Story = {
  render: TagsStatesExample,
};

export const EnteringAndEditingTagsDefaultValue: Story = {
  render: EnteringAndEditingTagsDefaultValueExample,
};

export const EnteringAndEditingTagsDelimiters: Story = {
  render: EnteringAndEditingTagsDelimitersExample,
};

export const TagsWithAddons: Story = {
  render: TagsWithAddonsExample,
};
