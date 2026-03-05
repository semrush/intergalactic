import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getDefaultChartControls } from './common/controls';
import type { CommonChartProps, LegendChartProps } from './common/controls';
import type { JSXProps } from '../../types/JSXProps';
import type { PlaygroundEntry } from '../../types/Playground';
import createGithubLink from '../../utils/createGHLink';

type HistogramChartProps = {
  commonChartProps: CommonChartProps;
  legendProps: LegendChartProps;
};
export type HistogramChartJSXProps = JSXProps<HistogramChartProps>;

const data = [...Array(5).keys()].map((_, i) => ({
  x: i,
  Category1: Math.random() * 10,
  Category2: Math.random() * 10,
}));

function getJSX(props: HistogramChartJSXProps) {
  return (
    <Chart.Histogram
      plotWidth={300}
      plotHeight={200}
      groupKey='x'
      data={data}
      aria-label='Histogram'
      {...props.commonChartProps}
      {...(props.legendProps && {
        legendProps: props.legendProps,
        showLegend: props.commonChartProps.showLegend as true,
      })}
      {...(props.legendProps?.patterns && { patterns: props.legendProps.patterns })}
    />
  );
}

const entry: PlaygroundEntry<HistogramChartJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: getDefaultChartControls(),
  link: createGithubLink('d3-chart'),
  filterProps: ['data'],
};

export default entry;
