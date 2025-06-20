import DnD from '@semcore/drag-and-drop';
import type { Meta, StoryObj } from '@storybook/react-vite';

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
