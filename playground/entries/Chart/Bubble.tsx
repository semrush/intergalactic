import { Chart } from '@semcore/d3-chart';
import React from 'react';

import ChartControls from './common/controls';
import type { CommonChartProps, LegendChartProps } from './common/controls';
import type { JSXProps } from '../../types/JSXProps';
import type { PlaygroundEntry } from '../../types/Playground';
import createGithubLink from '../../utils/createGHLink';

type BubbleChartProps = {
  commonChartProps: CommonChartProps;
  legendProps: LegendChartProps;
};
export type BubbleChartJSXProps = JSXProps<BubbleChartProps>;

const data = [
  { x: 2, y: 3, value: 5040, label: 'label 1' },
  { x: 1, y: 9, value: 40, label: 'label 2' },
  { x: 6, y: 2, value: 45634, label: 'label 3' },
  { x: 4, y: 7, value: 245, label: 'label 4' },
  { x: 9, y: 5, value: 7462, label: 'label 5' },
];

function getJSX(props: BubbleChartJSXProps) {
  return (
    <Chart.Bubble
      plotWidth={300}
      plotHeight={200}
      data={data}
      {...props.commonChartProps}
      {...(props.legendProps && { legendProps: props.legendProps })}
      {...(props.legendProps?.patterns && { patterns: props.legendProps.patterns })}
    />
  );
}

const entry: PlaygroundEntry<BubbleChartJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    ...ChartControls,
  },
  link: createGithubLink('d3-chart'),
  filterProps: ['data'],
};

export default entry;
