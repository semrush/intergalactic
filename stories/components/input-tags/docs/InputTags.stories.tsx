import type { Meta, StoryObj } from '@storybook/react';

import InputTags from '@semcore/input-tags';

import SelectForTagFilteringExample from './examples/select_for_tag_filtering';
import EnteringAndEditingTagsExample from './examples/entering_and_editing_tags';
import WrappingEmailInTagExample from './examples/wrapping_email_in_tag';

const meta: Meta<typeof InputTags> = {
  title: 'Components/InputTags/Documentation',
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
