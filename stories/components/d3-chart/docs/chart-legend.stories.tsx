import type { Meta, StoryObj } from '@storybook/react-vite';

import CustomShapeAsLegendItemExample from './examples/chart-legend/custom-shape-as-legenditem';
import TableViewExample from './examples/chart-legend/table-view';
const meta: Meta = {
  title: 'Components/d3Charts/Documentation/ChartLegend',
};
export default meta;
export const TableView: StoryObj = {
  render: TableViewExample,
};
export const CustomShapeAsLegendItem: StoryObj = {
  render: CustomShapeAsLegendItemExample,
};
