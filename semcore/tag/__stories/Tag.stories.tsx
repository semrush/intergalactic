import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tag from '@semcore/tag';
import { RemovingTagWithAddonExample } from './example/RemovingTagWithAddonExample';
import { TagAddonSizesPositionsExample } from './example/TagAddonSizesPositionsExample';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag/Test',
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const RemovingTagWithAddon: Story = {
  render: RemovingTagWithAddonExample,
};

export const TagWithAddonSizesAndPositions: Story = {
  render: TagAddonSizesPositionsExample,
};
