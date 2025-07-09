import { DataTable } from '@semcore/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CheckboxInTableDemo from './examples/checkbox-tests/checkbox-in-table.tsx';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/Checkbox',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const CheckboxInTable: Story = {
  render: CheckboxInTableDemo,
};
