import type { Meta, StoryObj } from '@storybook/react';

import InputTags from '@semcore/input-tags';

import TagsWithAddonsExample from './examples/tags_with_addons';
import AdditionChildrenWrapperExample from './examples/addition_children_wrapper';

const meta: Meta<typeof InputTags> = {
  title: 'Components/InputTags/Advanced',
  component: InputTags,
};

export default meta;
type Story = StoryObj<typeof InputTags>;

export const TagsWithAddons: Story = {
  render: TagsWithAddonsExample,
};

export const AdditionChildrenWrapper: Story = {
  render: AdditionChildrenWrapperExample,
};
