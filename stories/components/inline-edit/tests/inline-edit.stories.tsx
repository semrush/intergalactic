import InlineEdit from '@semcore/ui/inline-edit';
import type { Meta, StoryObj } from '@storybook/react-vite';

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
