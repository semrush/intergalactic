import type { Meta, StoryObj } from '@storybook/react-vite';

import AllComponentsExample from './all-components';
import ChartPaletteExample from './chart-palette';

const meta: Meta = {
  title: 'Patterns/Core/Advanced',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AllComponents: Story = {
  render: AllComponentsExample,
  parameters: {
    layout: 'fullscreen',
  },
};

export const ChartPalette: Story = {
  name: 'Chart palette',
  render: ChartPaletteExample,
};
