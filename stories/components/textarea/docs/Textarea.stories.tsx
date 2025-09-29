import Textarea from '@semcore/ui/textarea';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TextareaWithAutoHeightExample, { defaultProps } from './examples/textarea_with_auto_height';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea/Documentation',
  component: Textarea,
};

export default meta;

export const TextareaWithAutoHeight: StoryObj<typeof defaultProps> = {
  render: TextareaWithAutoHeightExample,
  argTypes: {
    value: {
      control: { type: 'text' },
    },
    defaultValue: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    state: {
      control: { type: 'select' },
      options: ['normal', 'valid', 'invalid'],
    },
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    resize: {
      control: { type: 'select' },
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
    minRows: {
      control: { type: 'number' },
    },
    maxRows: {
      control: { type: 'number' },
    },
    autoFocus: {
      control: { type: 'boolean' },
    },
  },
  args: defaultProps,
};
