import InputTags from '@semcore/input-tags';
import type { Meta, StoryObj } from '@storybook/react-vite';

import EnteringAndEditingTagsDefaultValueExample from './examples/entering_and_editing_tags-default-value';
import TagsWithAddonsExample, { defaultPropsEmail } from './examples/tags-with-addons';

const meta: Meta<typeof InputTags> = {
  title: 'Components/InputTags/Tests',
  component: InputTags,
};

export default meta;

export const EnteringAndEditingTagsDefaultValue: StoryObj<typeof InputTags> = {
  render: EnteringAndEditingTagsDefaultValueExample,
};

export const TagsWithAddons: StoryObj<typeof defaultPropsEmail> = {
  render: TagsWithAddonsExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 'l', 'xl'],
    },
    interactive: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    theme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'valid'],
    },
    color: {
      control: { type: 'select' },
      options: ['gray-500', 'blue-500', 'green-500', 'salad-500', 'orange-500', 'yellow-500', 'grredeen-500', 'pink-500', 'violet-500', 'white-500'],
    },
  },
  args: defaultPropsEmail,
};
