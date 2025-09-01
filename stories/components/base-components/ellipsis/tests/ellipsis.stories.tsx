import type { Meta, StoryObj } from '@storybook/react-vite';

import LinkExample, { defaultProps as LinkExampleProps } from './examples/link_with_ellipsis';
import TextExample from './examples/text_cases';
import TrimWithTextSizeExample, { defaultProps as TextSizeExampleProps } from './examples/trim_with_special_text_size';

const meta: Meta = {
  title: 'Components/Base-Components/Ellipsis/Tests',
};

export default meta;

export const Link: StoryObj<typeof LinkExampleProps> = {
  render: LinkExample,
  argTypes: {
    ellipsis: {
      control: 'select',
      options: ['false', 'true', 'trim:middle', 'trim:end', 'trim:end maxLine:2', 'trim:end maxLine:6'],
      mapping: {
        'false': false,
        'true': true,
        'trim:middle': { trim: 'middle' },
        'trim:end': { trim: 'end' },
        'trim:end maxLine:2': { trim: 'end', maxLine: 2 },
        'trim:end maxLine:6': { trim: 'end', maxLine: 6 },
      },
    },
  },
  args: LinkExampleProps,
};

export const TrimWithTextSize: StoryObj<typeof TextSizeExampleProps> = {
  render: TrimWithTextSizeExample,
  argTypes: {
    ellipsis: {
      control: 'select',
      options: ['false', 'true', 'trim:middle', 'trim:end', 'trim:end maxLine:2', 'trim:end maxLine:6'],
      mapping: {
        'false': false,
        'true': true,
        'trim:middle': { trim: 'middle' },
        'trim:end': { trim: 'end' },
        'trim:end maxLine:2': { trim: 'end', maxLine: 2 },
        'trim:end maxLine:6': { trim: 'end', maxLine: 6 },
      },
    },

    size: {
      control: { type: 'select' },
      options: ['100', '200', '300', '400', '500', '600', '700', '800'],
    },
    w: {
      control: { type: 'number' },
    },
  },
  args: TextSizeExampleProps,
};

export const Text = {
  render: TextExample,
};
