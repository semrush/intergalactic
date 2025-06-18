import InputTags from '@semcore/input-tags';
import type { Meta, StoryObj } from '@storybook/react-vite';

import EnteringAndEditingTagsExample, { defaultProps } from './examples/entering_and_editing_tags';
import SelectForTagFilteringExample from './examples/select_for_tag_filtering';
import WrappingEmailInTagExample from './examples/wrapping_email_in_tag';

const meta: Meta<typeof InputTags> = {
  title: 'Components/InputTags/Documentation',
  component: InputTags,
};

export default meta;
type Story = StoryObj<typeof defaultProps>;

export const SelectForTagFiltering: Story = {
  render: SelectForTagFilteringExample,
};

export const EnteringAndEditingTags: Story = {
  render: EnteringAndEditingTagsExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    placeholder: {
      control: { type: 'text' },
    },
    defaultValue: {
      control: { type: 'text' },
    },
    state: {
      control: { type: 'select' },
      options: ['normal', 'invalid', 'valid'],
    },
  },
  args: defaultProps,
};

export const WrappingEmailInTag: Story = {
  render: WrappingEmailInTagExample,
};
