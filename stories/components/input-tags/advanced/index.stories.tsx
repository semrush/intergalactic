import type { Meta, StoryObj } from '@storybook/react';

import InputTags from '@semcore/input-tags';

import TagsWithAddonsExample from './components/tags_with_addons';

const meta: Meta<typeof InputTags> = {
  title: 'Components/InputTags',
  component: InputTags,
};

export default meta;
type Story = StoryObj<typeof InputTags>;

export const TagsWithAddons: Story = {
  render: TagsWithAddonsExample,
};
