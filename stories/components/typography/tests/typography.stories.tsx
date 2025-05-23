import type { Meta, StoryObj } from '@storybook/react';

import DifferentTextPropsExample from './examples/text-with-diff-combimations';
import ListNestedExample from './examples/nested-list';
import BloquoteExample from './examples/blockquote';
import TextFontAndSizeExample from './examples/text-font-size-and-weight-headers-and-paragrapsh';
import ListAxeExample from './examples/list-axe-test';


const meta: Meta = {
  title: 'Components/Typography/Tests',
};
export default meta;

type Story = StoryObj;

export const DifferentTextProps: Story = {
  render: DifferentTextPropsExample,
};

export const ListNested: Story = {
  render: ListNestedExample,
};

export const Bloquote: Story = {
  render: BloquoteExample,
};

export const TextFontAndSize: Story = {
  render: TextFontAndSizeExample,
};

export const ListExampleAxe: Story = {
  render: ListAxeExample,
};
