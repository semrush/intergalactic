import type { Meta, StoryObj } from '@storybook/react';
import ProductHead from '@semcore/product-head';

import LongLongTitleExample from './examples/long-long-title';

const meta: Meta<typeof ProductHead> = {
  title: 'Components/ProductHead/Advanced',
  component: ProductHead,
};

export default meta;
type Story = StoryObj<typeof ProductHead>;

export const LongLongTitle: Story = {
  render: LongLongTitleExample,
};
