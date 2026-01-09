import type { Meta, StoryObj } from '@storybook/react-vite';

import TableLinkExample from './examples/in_table_with_link';
import LinkExample, { defaultProps as LinkExampleProps } from './examples/link_with_ellipsis';
import TextExample from './examples/text_cases';
import TrimWithTextSizeExample, { defaultProps as TextSizeExampleProps } from './examples/trim_with_special_text_size';

const meta: Meta = {
  title: 'Components/Base Components/Ellipsis/Tests',
};

export default meta;

export const TableLink: StoryObj = {
  render: TableLinkExample,
};

export const Link: StoryObj<typeof LinkExampleProps> = {
  render: LinkExample,
  argTypes: {
    ellipsis: {
      control: 'select',
      options: ['false', 'true', 'cropPosition:middle', 'cropPosition:end', 'cropPosition:end maxLine:2', 'cropPosition:end maxLine:6'],
      mapping: {
        'false': false,
        'true': true,
        'cropPosition:middle': { cropPosition: 'middle' },
        'cropPosition:end': { cropPosition: 'end' },
        'cropPosition:end maxLine:2': { cropPosition: 'end', maxLine: 2 },
        'cropPosition:end maxLine:6': { cropPosition: 'end', maxLine: 6 },
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
      options: ['false', 'true', 'cropPosition:middle', 'cropPosition:end', 'cropPosition:end maxLine:2', 'cropPosition:end maxLine:6'],
      mapping: {
        'false': false,
        'true': true,
        'cropPosition:middle': { cropPosition: 'middle' },
        'cropPosition:end': { cropPosition: 'end' },
        'cropPosition:end maxLine:2': { cropPosition: 'end', maxLine: 2 },
        'cropPosition:end maxLine:6': { cropPosition: 'end', maxLine: 6 },
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
