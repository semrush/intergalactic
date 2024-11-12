import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tag from '@semcore/tag';
import { TagWithAddonExample } from './example/TagWithAddonExample';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const TagWithAddon: Story = {
  render: TagWithAddonExample,
};
