import type { Meta, StoryObj } from '@storybook/react';

import DropdownMenu from '@semcore/dropdown-menu';

import BasicExample from './examples/basic';
import DropdownMenuExample from './examples/dropdown-menu';
import ItemActionsExample from './examples/item_actions';
import ListItemTypesExample from './examples/list_item_types';
import NestedExample from './examples/nested';
import NestedWithFocusableExample from './examples/nested_with_focusable';
import TheSecondMethodExample from './examples/the_second_method';
import SelectableRadioItemsExample from './examples/selectable_radio_items';
import MultiselectItemsExample from './examples/multiselect_items';

import { BasicUsageTest } from './__tests__/basic.test';
import { DropdownMenuTest } from './__tests__/dropdown-menu.test';
import { ListItemTypesTest } from './__tests__/list_item_types.test';
import { ItemActionsTest } from './__tests__/item_actions.test';
import { NestedWithFocusableTest } from './__tests__/nested_with_focusable.test';
import { NestedTest } from './__tests__/nested.test';
import { TheSecondMethodTest } from './__tests__/the_second_method.test';
import { MultiselectItemsTest } from './__tests__/multiselect_items.test';
import { SelectableRadioTest } from './__tests__/selectable_radio_items.test';
import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/Dropdown Menu/Documentation',
  component: DropdownMenu,
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Basic: Story = {
  render: BasicExample,
  play: playWrapper(BasicUsageTest),
};

export const DropdownMenuStory: Story = {
  render: DropdownMenuExample,
  play: playWrapper(DropdownMenuTest),
};

export const ItemActions: Story = {
  render: ItemActionsExample,
  play: playWrapper(ItemActionsTest),
};

export const ListItemTypes: Story = {
  render: ListItemTypesExample,
  play: playWrapper(ListItemTypesTest),
};

export const Nested: Story = {
  render: NestedExample,
  play: playWrapper(NestedTest),
};

export const NestedWithFocusable: Story = {
  render: NestedWithFocusableExample,
  play: playWrapper(NestedWithFocusableTest),
};

export const TheSecondMethod: Story = {
  render: TheSecondMethodExample,
  play: playWrapper(TheSecondMethodTest),
};

export const SelectableRadioItems: Story = {
  render: SelectableRadioItemsExample,
  play: playWrapper(SelectableRadioTest),
};

export const MultiselectItems: Story = {
  render: MultiselectItemsExample,
  play: playWrapper(MultiselectItemsTest),
};
