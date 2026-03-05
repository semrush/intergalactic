import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getDefaultChartControls } from './common/controls';
import type { CommonChartProps, LegendChartProps } from './common/controls';
import type { JSXProps } from '../../types/JSXProps';
import type { PlaygroundEntry } from '../../types/Playground';
import createGithubLink from '../../utils/createGHLink';

type BubbleChartProps = {
  commonChartProps: Omit<CommonChartProps, 'showTotalInTooltip'>;
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
  const isRow = props.commonChartProps.direction === 'row' || props.commonChartProps.direction === 'row-reverse';
  const plotWidth = isRow ? 280 : 320;

  return (
    <Chart.Bubble
      plotWidth={plotWidth}
      plotHeight={200}
      data={data}
      aria-label='Bubble chart'
      {...props.commonChartProps}
      {...(props.legendProps && {
        w: isRow ? '72px' : '100%',
        legendProps: props.legendProps,
        showLegend: props.commonChartProps.showLegend as true,
      })}
      {...(props.legendProps?.patterns && { patterns: props.legendProps.patterns })}
    />
  );
}

const entry: PlaygroundEntry<BubbleChartJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: getDefaultChartControls({
    skip: {
      commonChartProps: ['showTotalInTooltip'],
    },
  }),
  link: createGithubLink('d3-chart'),
  filterProps: ['data'],
};

export default entry;
