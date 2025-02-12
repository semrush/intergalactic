import type { Meta, StoryObj } from '@storybook/react';

import DnD from '@semcore/drag-and-drop';

import CardsExample from './examples/with_cards';
import DropdownMenuExample from './examples/with_dropdownmenu';

import { WithDropdownMenuTest } from './__tests__/with_dropdownmenu.test';
import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta<typeof DnD> = {
  title: 'Components/DragAndDrop/Documentation',
  component: DnD,
};

export default meta;
type Story = StoryObj<typeof DnD>;

export const Cards: Story = {
  render: CardsExample,
};

export const DropdownMenu: Story = {
  render: DropdownMenuExample,
  play: playWrapper(WithDropdownMenuTest),
};
