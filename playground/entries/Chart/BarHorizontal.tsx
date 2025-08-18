import { Chart } from '@semcore/d3-chart';
import React from 'react';

import ChartControls from './common/controls';
import type { CommonChartProps, LegendChartProps } from './common/controls';
import type { JSXProps } from '../../types/JSXProps';
import type { PlaygroundEntry } from '../../types/Playground';
import createGithubLink from '../../utils/createGHLink';

type BarChartProps = {
  commonChartProps: CommonChartProps;
  legendProps: LegendChartProps;
};
export type BarChartJSXProps = JSXProps<BarChartProps>;

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Category1: Math.random() * 10,
  Category2: Math.random() * 10,
}));

function getJSX(props: BarChartJSXProps) {
  return (
    <Chart.Bar
      plotWidth={300}
      plotHeight={200}
      groupKey='x'
      data={data}
      invertAxis
      aria-label='Horizontal bar chart'
      {...props.commonChartProps}
      {...(props.legendProps && { legendProps: props.legendProps })}
      {...(props.legendProps?.patterns && { patterns: props.legendProps.patterns })}
    />
  );
}

const entry: PlaygroundEntry<BarChartJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    ...ChartControls,
  },
  link: createGithubLink('d3-chart'),
  filterProps: ['data'],
};

export default entry;
