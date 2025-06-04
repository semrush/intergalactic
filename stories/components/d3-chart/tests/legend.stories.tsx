import type { Meta, StoryObj } from '@storybook/react';

import LegendShapesRowExample from './examples/chart-legend/shapes-row';
import LegendShapesColumnExample from './examples/chart-legend/shapes-column';

const meta: Meta = {
  title: 'Components/d3Charts/tests/ChartLegend',
};

export default meta;

export const LegendShapesColumn: StoryObj = {
  render: LegendShapesColumnExample,
};

export const LegendShapesRow: StoryObj = {
    render: LegendShapesRowExample,
  };
