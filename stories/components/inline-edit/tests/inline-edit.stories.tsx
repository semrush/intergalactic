import type { Meta, StoryObj } from '@storybook/react';

import InlineEdit from '@semcore/inline-edit';

import SimpleUseExample from './examples/test_use';

const meta: Meta<typeof InlineEdit> = {
  title: 'Components/InlineEdit/Tests',
  component: InlineEdit,
};

export default meta;
type Story = StoryObj<typeof InlineEdit>;

export const SimpleUse: Story = {
  render: SimpleUseExample,
};