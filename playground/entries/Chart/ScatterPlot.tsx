import { Chart } from '@semcore/d3-chart';
import React from 'react';

import ChartControls from './common/controls';
import type { CommonChartProps, LegendChartProps } from './common/controls';
import type { JSXProps } from '../../types/JSXProps';
import type { PlaygroundEntry } from '../../types/Playground';
import createGithubLink from '../../utils/createGHLink';

type ScatterPlotChartProps = {
  commonChartProps: CommonChartProps;
  legendProps: LegendChartProps;
};

export type ScatterPlotChartJSXProps = JSXProps<ScatterPlotChartProps>;

const data = [...Array(25).keys()].map((_, i) => ({
  x: i,
  category1: Math.random() * 10,
  category2: Math.random() * 10,
  value: Math.round(Math.random() * 10),
}));

function getJSX(props: ScatterPlotChartJSXProps) {
  return (
    <Chart.ScatterPlot
      plotWidth={300}
      plotHeight={300}
      groupKey='x'
      valueKey='value'
      xTicksCount={10}
      yTicksCount={6}
      data={data}
      aria-label='Scatterplot chart'
      {...props.commonChartProps}
      {...(props.legendProps && {
        legendProps: props.legendProps,
        showLegend: props.commonChartProps.showLegend as true,
      })}
      {...(props.legendProps?.patterns && { patterns: props.legendProps.patterns })}
    />
  );
}

const entry: PlaygroundEntry<ScatterPlotChartJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    ...ChartControls,
  },
  link: createGithubLink('d3-chart'),
  filterProps: ['data'],
};

export default entry;
