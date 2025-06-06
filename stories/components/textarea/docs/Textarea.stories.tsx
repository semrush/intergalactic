import Textarea from '@semcore/textarea';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TextareaWithAutoHeightExample from './examples/textarea_with_auto_height';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea/Documentation',
  component: Textarea,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const TextareaWithAutoHeight: Story = {
  render: TextareaWithAutoHeightExample,
};
