import DnD from '@semcore/drag-and-drop';
import type { Meta, StoryObj } from '@storybook/react-vite';

import type { DnDCardProps } from './examples/with-cards-all-props';
import CardsExample from './examples/with-cards-all-props';
import WithDropdownMenuAndScrollExample from './examples/with_dropdownmenu_and_scroll';
import TabPanelExample from './examples/with_tabpanel';

const meta: Meta<typeof DnD> = {
  title: 'Components/DragAndDrop/Tests',
  component: DnD,
};

export default meta;
type Story = StoryObj<typeof DnD>;

export const TabPanel: Story = {
  render: TabPanelExample,
};

export const WithDropdownMenuAndScroll: Story = {
  render: WithDropdownMenuAndScrollExample,
};

export const Cards: StoryObj<DnDCardProps> = {
  render: CardsExample,
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right', false],
    },
    zoneName: { control: 'text' },
    draggableCount: { control: { type: 'number', min: 0, max: 10 } },
    dropZoneCount: { control: { type: 'number', min: 0, max: 10 } },
    isCustomFocus: { control: 'boolean' },
    noDrop: { control: 'boolean' },
  },
};
