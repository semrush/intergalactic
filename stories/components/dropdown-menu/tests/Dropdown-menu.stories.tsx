import DropdownMenu from '@semcore/dropdown-menu';
import type { Meta, StoryObj } from '@storybook/react-vite';

import OnVisibleExample from './examples/on-visible';
import OnVisible2ndExample from './examples/on-visible-2nd';
import WithSearchExample from './examples/with-search';
import SizesExample from './examples/sizes';
import WidthExample from './examples/dd-width';
import SizesSelectableExample from './examples/sizes-selectable';
import SizesMultiselectExample from './examples/sizes-multiselect';
import WithDividerExample from './examples/dd-with-divider';
import ListItemsTypeExample from './examples/list_item_types';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/Dropdown Menu/Tests',
  component: DropdownMenu,
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const WithDivider: Story = {
  render: WithDividerExample,
};

export const ListItemsType: Story = {
  render: ListItemsTypeExample,
};

export const OnVisible: Story = {
  render: OnVisibleExample,
};

export const SizesSelectable: Story = {
  render: SizesSelectableExample,
};

export const SizesMultiselect: Story = {
  render: SizesMultiselectExample,
};

export const Sizes: Story = {
  render: SizesExample,
};

export const Width: Story = {
  render: WidthExample,
};

export const WithSearch: Story = {
  render: WithSearchExample,
};

export const OnVisible2nd: Story = {
  render: OnVisible2ndExample,
};
