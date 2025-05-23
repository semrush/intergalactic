import type { Meta, StoryObj } from '@storybook/react';

import ColorCustomizationExample from './examples/scatterplot-chart/color-customization';
import BasicUsageExample from './examples/scatterplot-chart/basic-usage';
import ColorCustomizationAndValuesInsideExample from './examples/scatterplot-chart/color-customization-and-values-inside';
import InitialDataLoadingExample from './examples/scatterplot-chart/initial-data-loading';
import LegendAndPatternFillExample from './examples/scatterplot-chart/legend-and-pattern-fill';
import ScatterPlotExample from './examples/scatterplot-chart/scatter-plot';
import ScatterPlotWithValuesInsideExample from './examples/scatterplot-chart/scatter-plot-with-values-inside';


const meta: Meta = {
  title: 'Components/d3Charts/Documentation/Scatterplot-Chart',
};

export default meta;

export const ColorCustomization: StoryObj = {
  render: ColorCustomizationExample,
};

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const ColorCustomizationAndValuesInside: StoryObj = {
  render: ColorCustomizationAndValuesInsideExample,
};

export const InitialDataLoading: StoryObj = {
  render: InitialDataLoadingExample,
};

export const LegendAndPatternFill: StoryObj = {
  render: LegendAndPatternFillExample,
};

export const ScatterPlot: StoryObj = {
  render: ScatterPlotExample,
};

export const ScatterPlotWithValuesInside: StoryObj = {
  render: ScatterPlotWithValuesInsideExample,
};
