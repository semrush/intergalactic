import DropdownMenu from '@semcore/ui/dropdown-menu';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicExample from './examples/dropdown_menu_base.tsx';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Spectrum/Dropdown Menu',
  component: DropdownMenu,
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Basic: Story = {
  render: BasicExample,
};
