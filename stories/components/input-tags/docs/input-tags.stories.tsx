import InputTags from '@semcore/ui/input-tags';
import type { Meta, StoryObj } from '@storybook/react-vite';

import EnteringAndEditingTagsExample, { defaultProps } from './examples/entering_and_editing_tags';
import SelectForTagFilteringExample from './examples/select_for_tag_filtering';
import WrappingEmailInTagExample, { defaultPropsEmail } from './examples/wrapping_email_in_tag';

const meta: Meta<typeof InputTags> = {
  title: 'Components/InputTags/Documentation',
  component: InputTags,
};

export default meta;

export const WrappingEmailInTag: StoryObj<typeof defaultPropsEmail> = {
  render: WrappingEmailInTagExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 'l', 'xl'],
    },
    editable: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    theme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'valid'],
    },
  },
  args: defaultPropsEmail,
};

export const EnteringAndEditingTags: StoryObj<typeof defaultProps> = {
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
    delimiters: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    state: {
      control: { type: 'select' },
      options: ['normal', 'invalid', 'valid'],
    },
  },
  args: defaultProps,
};

export const SelectForTagFiltering: StoryObj<typeof InputTags> = {
  render: SelectForTagFilteringExample,
};
