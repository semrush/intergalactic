import ProductHead from '@semcore/ui/product-head';
import type { Meta, StoryObj } from '@storybook/react-vite';

import ExtendedExample from './examples/extended_example';

const meta: Meta<typeof ProductHead> = {
  title: 'Components/ProductHead/Documentation',
  component: ProductHead,
};

export default meta;
type Story = StoryObj<typeof ProductHead>;

export const Extended: Story = {
  render: ExtendedExample,
};
