import Pagination from '@semcore/ui/pagination';
import type { Meta, StoryObj } from '@storybook/react-vite';

import SizesExample from './examples/current-page-props';
import IntearctiveIconInInputExample from './examples/interactive-icon-in-input';
import CustomStylesExample from './examples/pages-and-input-custom-styles';
import TotalPageIs1Example from './examples/pages_is_1_locales';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination/Tests',
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Page1AndLocalesCases: Story = {
  render: TotalPageIs1Example,
};

export const Sizes: Story = {
  render: SizesExample,
};

export const CustomStyles: Story = {
  render: CustomStylesExample,
};

export const IntearctiveIconInInput: Story = {
  render: IntearctiveIconInInputExample,
};
