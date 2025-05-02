import type { Meta, StoryObj } from '@storybook/react';

import DataTable from '@semcore/data-table';

import FixedHeaderWithSpinOverlayExample from './examples/fixed-header-with-spin-overlay';
import TestRenderExample from './examples/test-render';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const FixedHeaderWithSpinOverlay: Story = {
  render: FixedHeaderWithSpinOverlayExample,
};

export const TestRender: Story = {
  render: TestRenderExample,
};
