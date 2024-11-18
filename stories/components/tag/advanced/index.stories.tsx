import type { Meta, StoryObj } from '@storybook/react';
import Tag from '@semcore/tag';

import { TagAddonSizesPositionsExample } from './components/TagAddonSizesPositionsExample';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag/Advanced',
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const TagWithAddonSizesAndPositions: Story = {
  render: TagAddonSizesPositionsExample,
};
