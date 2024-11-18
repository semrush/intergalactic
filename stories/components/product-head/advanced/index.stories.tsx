import type { Meta, StoryObj } from '@storybook/react';
import ProductHead from '@semcore/product-head';

import LongLongTitleExample from './component/long-long-title';

const meta: Meta<typeof ProductHead> = {
  title: 'Components/ProductHead',
  component: ProductHead,
};

export default meta;
type Story = StoryObj<typeof ProductHead>;

export const LongLongTitle: Story = {
  render: LongLongTitleExample,
};
