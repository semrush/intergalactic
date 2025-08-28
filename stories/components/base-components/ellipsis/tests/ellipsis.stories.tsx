import type { Meta, StoryObj } from '@storybook/react-vite';

import LinkExample, { defaultProps } from './examples/link_in_box_ellipsis';
import TextExample from './examples/text_cases';
import TrimWithTextSizeExample from './examples/trim_with_special_text_size';

const meta: Meta = {
  title: 'Components/Base-Components/Ellipsis/Tests',
};

export default meta;

export const Link: StoryObj<typeof defaultProps> = {
  render: LinkExample,
  argTypes: {
    ellipsis: {
      control: 'select',
      options: ['false', 'true', 'trim:middle', 'trim:end'],
      mapping: {
        'false': false,
        'true': true,
        'trim:middle': { trim: 'middle' },
        'trim:end': { trim: 'end' },
      },
    },
  },
  args: defaultProps,
};

export const TrimWithTextSize = {
  render: TrimWithTextSizeExample,
};

export const Text = {
  render: TextExample,
};
