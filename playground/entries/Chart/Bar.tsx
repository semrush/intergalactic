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
  withTrend: boolean;
};
export type BarChartJSXProps = JSXProps<BarChartProps>;

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Category1: Math.random() * 10,
  Category2: Math.random() * 10,
}));

const trendData = {
  Category1: data.map((item) => {
    return {
      x: item.x,
      y: item.Category1 - 0.5,
    };
  }),
  Category2: data.map((item) => {
    return {
      x: item.x,
      y: item.Category2 - 0.5,
    };
  }),
};

function getJSX(props: BarChartJSXProps) {
  return (
    <Chart.Bar
      plotWidth={300}
      plotHeight={200}
      groupKey='x'
      data={data}
      aria-label='Bar chart'
      {...props.commonChartProps}
      {...(props.legendProps && {
        legendProps: props.legendProps,
        showLegend: props.commonChartProps.showLegend as true,
      })}
      {...(props.legendProps?.patterns && { patterns: props.legendProps.patterns })}
      {...(props.withTrend && { trend: trendData })}
    />
  );
}

const entry: PlaygroundEntry<BarChartJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    withTrend: {
      type: 'boolean',
      value: false,
      displayName: 'Trend',
    },
    ...ChartControls,
  },
  link: createGithubLink('d3-chart'),
  filterProps: ['data'],
};

export default entry;
