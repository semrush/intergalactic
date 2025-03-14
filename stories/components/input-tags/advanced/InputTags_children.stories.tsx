import type { Meta, StoryObj } from '@storybook/react';

import InputTags from '@semcore/input-tags';

import TagusAndInputCasesExample from './children_wrapper/tagus-and-input-cases';
import TagsAndInputCasesExample from './children_wrapper/tags-and-input-cases';
import InnerFunctionExample from './children_wrapper/inner-function-cases';
import TagusTagsExample from './children_wrapper/tagus-and-tags-cases';

const meta: Meta<typeof InputTags> = {
  title: 'Components/InputTags/Advanced/ChildredWrapper',
  component: InputTags,
};

export default meta;
type Story = StoryObj<typeof InputTags>;

export const TagusAndInputCases: Story = {
  render: TagusAndInputCasesExample,
};

export const TagsAndInputCases: Story = {
  render: TagsAndInputCasesExample,
};

export const InnerFunctionCases: Story = {
  render: InnerFunctionExample,
};

export const TagusTagsAndInput: Story = {
  render: TagusTagsExample,
};
