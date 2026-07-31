import type { Meta, StoryObj } from '@storybook/react-vite';

import BloquoteExample, { defaultProps as BloquoteProps } from './examples/blockquote';
import FormattedNestedListMarginsExample, { defaultProps as FormattedNestedListMarginsProps } from './examples/formatted-nested-list-margins';
import ListAxeExample from './examples/list-axe-test';
import ListNestedExample, { defaultProps as ListNestedProps } from './examples/nested-list';
import TextFontAndSizeExample from './examples/text-font-size-and-weight-headers-and-paragrapsh';
import DifferentTextPropsExample, { defaultProps as DifferentTextProps } from './examples/text-with-diff-combimations';

const meta: Meta = {
  title: 'Components/Typography/Tests',
};
export default meta;

type Story = StoryObj;

function getCommonArgTypes() {
  return {
    size: {
      control: { type: 'select' },
      options: ['100', '200', '300', '350', '400', '500', '600', '700', '800'],
    },
    noWrap: { control: { type: 'boolean' } },
    bold: { control: { type: 'boolean' } },
    semibold: { control: { type: 'boolean' } },
    medium: { control: { type: 'boolean' } },
    italic: { control: { type: 'boolean' } },
    underline: { control: { type: 'boolean' } },
    monospace: { control: { type: 'boolean' } },
    lineThrough: { control: { type: 'boolean' } },
    uppercase: { control: { type: 'boolean' } },
    lowercase: { control: { type: 'boolean' } },
    capitalize: { control: { type: 'boolean' } },
    color: {
      control: { type: 'select' },
      options: ['blanchedalmond', '#3eeb4c', 'dark-violet'],
    },
    fontSize: {
      control: { type: 'select' },
      options: ['10px', '20px', '30px'],
    },
    lineHeight: {
      control: { type: 'select' },
      options: ['10px', '20px', '30px', '40px'],
    },
    fontWeight: {
      control: { type: 'select' },
      options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
    textAlign: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    use: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    disabled: { control: { type: 'boolean' } },
  } as const;
}

export const ListNested: StoryObj<typeof ListNestedProps> = {
  render: ListNestedExample,
  argTypes: {
    ...getCommonArgTypes(),
  },
  args: ListNestedProps,
};

export const Bloquote: StoryObj<typeof BloquoteProps> = {
  render: BloquoteExample,
  argTypes: {
    author: {
      control: { type: 'text' },
    },
  },
  args: BloquoteProps,
};

export const TextProps: StoryObj<typeof DifferentTextProps> = {
  render: DifferentTextPropsExample,
  argTypes: {
    ...getCommonArgTypes(),
    display: {
      control: { type: 'select' },
      options: ['block'],
    },
    w: {
      control: { type: 'number' },
    },
    inline: {
      control: { type: 'boolean' },
    },
  },
  args: DifferentTextProps,
};

export const TextFontAndSize: Story = {
  render: TextFontAndSizeExample,
};

export const ListExampleAxe: Story = {
  render: ListAxeExample,
};

export const FormattedNestedListMargins: StoryObj<typeof FormattedNestedListMarginsProps> = {
  render: FormattedNestedListMarginsExample,
  argTypes: {
    formatTags: {
      control: { type: 'boolean' },
    },
  },
  args: FormattedNestedListMarginsProps,
};
