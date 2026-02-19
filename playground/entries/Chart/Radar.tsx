import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getDefaultChartControls } from './common/controls';
import type { CommonChartProps, LegendChartProps } from './common/controls';
import type { JSXProps } from '../../types/JSXProps';
import type { PlaygroundEntry } from '../../types/Playground';
import createGithubLink from '../../utils/createGHLink';

type RadarChartProps = {
  commonChartProps: Omit<CommonChartProps, 'showXAxis' | 'showYAxis' | 'showTotalInTooltip'>;
  legendProps: LegendChartProps;
  radarChartProps: {
    showDots: boolean;
    circle: boolean;
  };
};

export type RadarChartJSXProps = JSXProps<RadarChartProps>;

const data = {
  categories: ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6'],
  data_1: [1, 3, 5, 5, 9, 2],
  data_2: [5, 2, 1, 2, 7, 6],
};

function getJSX(props: RadarChartJSXProps) {
  return (
    <Chart.Radar
      plotWidth={300}
      plotHeight={300}
      groupKey='categories'
      data={data}
      aria-label='Radar chart'
      {...props.commonChartProps}
      {...(props.legendProps && {
        legendProps: props.legendProps,
        showLegend: props.commonChartProps.showLegend as true,
      })}
      {...(props.legendProps?.patterns && { patterns: props.legendProps.patterns })}
      {...props.radarChartProps}
    />
  );
}

const entry: PlaygroundEntry<RadarChartJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    radarChartProps: {
      type: 'group',
      groupName: 'Radar chart props',
      controls: {
        showDots: {
          type: 'boolean',
          value: true,
          displayName: 'Dots',
        },
        circle: {
          type: 'boolean',
          value: false,
          displayName: 'Circular grid',
        },
      },
    },
    ...getDefaultChartControls({
      skip: {
        commonChartProps: ['showXAxis', 'showYAxis', 'showTotalInTooltip'],
      },
    }),
  },
  link: createGithubLink('d3-chart'),
  filterProps: ['data'],
  JSXDisplayName: 'Chart.Radar',
};

export default entry;
