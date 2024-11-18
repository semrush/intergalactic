import type { Meta, StoryObj } from '@storybook/react';

import InputTags from '@semcore/input-tags';

import SelectForTagFilteringExample from './docs-examples/select_for_tag_filtering';
import EnteringAndEditingTagsExample from './docs-examples/entering_and_editing_tags';
import WrappingEmailInTagExample from './docs-examples/wrapping_email_in_tag';

import TagsWithAddonsExample from './components/tags_with_addons';

const meta: Meta<typeof InputTags> = {
  title: 'Components/InputTags',
  component: InputTags,
};

export default meta;
type Story = StoryObj<typeof InputTags>;

export const SelectForTagFiltering: Story = {
  render: SelectForTagFilteringExample,
};

export const EnteringAndEditingTags: Story = {
  render: EnteringAndEditingTagsExample,
};

export const WrappingEmailInTag: Story = {
  render: WrappingEmailInTagExample,
};

export const TagsWithAddons: Story = {
  render: TagsWithAddonsExample,
};
