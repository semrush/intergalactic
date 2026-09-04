import InputTags from '@semcore/ui/input-tags';
import type { Meta, StoryObj } from '@storybook/react-vite';

import EnteringAndEditingTagsExample, { defaultProps as enteringAndEditingTagsProps } from './examples/entering_and_editing_tags';
import TagsWithAddonsExample, { defaultPropsEmail } from './examples/tags-with-addons';

const meta: Meta<typeof InputTags> = {
  title: 'Components/InputTags/Tests',
  component: InputTags,
};

export default meta;

export const EnteringAndEditingTags: StoryObj<any> = {
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
      options: ['normal', 'invalid', 'additional'],
    },
    editable: {
      control: { type: 'boolean' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
    active: {
      control: { type: 'boolean' },
    },
    hintProps: {
      control: 'select',
      options: ['default', 'false'],
      mapping: {
        default: undefined,
        false: false,
      },
    },
    hintPlacement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
  args: enteringAndEditingTagsProps,
};

export const TagsWithAddons: StoryObj<any> = {
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
      options: ['primary', 'secondary', 'additional'],
    },
    color: {
      control: { type: 'select' },
      options: ['gray-500', 'blue-500', 'green-500', 'salad-500', 'orange-500', 'yellow-500', 'grredeen-500', 'pink-500', 'violet-500', 'white-500'],
    },
  },
  args: defaultPropsEmail,
};
