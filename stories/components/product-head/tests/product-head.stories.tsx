import ProductHead from '@semcore/ui/product-head';
import type { Meta, StoryObj } from '@storybook/react-vite';

import ExtendedExample from './examples/test_example';

const meta: Meta<typeof ProductHead> = {
  title: 'Components/ProductHead/Tests',
  component: ProductHead,
};

export default meta;
type Story = StoryObj<typeof ProductHead>;

export const Extended: Story = {
  render: ExtendedExample,
};
