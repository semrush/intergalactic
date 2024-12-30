import type { Meta, StoryObj } from '@storybook/react';

import DnD from '@semcore/drag-and-drop';

import CardsExample from './examples/with_cards';
import SelectExample from './examples/with_select';
import TabPanelExample from './examples/with_tabpanel';

const meta: Meta<typeof DnD> = {
  title: 'Components/DragAndDrop/Documentation',
  component: DnD,
};

export default meta;
type Story = StoryObj<typeof DnD>;

export const Cards: Story = {
  render: CardsExample,
};

export const Select: Story = {
  render: SelectExample,
};

export const TabPanel: Story = {
  render: TabPanelExample,
};
