import { Chart } from '@semcore/ui/d3-chart';
import { curveCardinal, curveLinearClosed, curveBumpX } from 'd3-shape';
import React from 'react';

import { getDefaultChartControls } from './common/controls';
import type { CommonChartProps, LegendChartProps } from './common/controls';
import type { JSXProps } from '../../types/JSXProps';
import type { PlaygroundEntry } from '../../types/Playground';
import createGithubLink from '../../utils/createGHLink';

const Curves = ['curveCardinal', 'curveLinearClosed', 'curveBumpX'] as const;

type AreaChartProps = {
  commonChartProps: CommonChartProps;
  legendProps: LegendChartProps;
  linearChartProps: {
    curve: (typeof Curves)[number];
    showDots: boolean;
    stacked: boolean;
  };
};
export type AreaChartJSXProps = JSXProps<AreaChartProps>;

const CurveMap = {
  curveCardinal,
  curveLinearClosed,
  curveBumpX,
};

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
  Line3: Math.random() * 10,
}));

function getJSX(props: AreaChartJSXProps) {
  const { curve, ...restLinearChartProps } = props.linearChartProps;

  return (
    <Chart.Area
      plotWidth={300}
      plotHeight={200}
      groupKey='x'
      data={data}
      aria-label='Stacked area chart'
      {...props.commonChartProps}
      {...restLinearChartProps}
      {...(props.legendProps && {
        legendProps: props.legendProps,
        showLegend: props.commonChartProps.showLegend as true,
      })}
      {...(props.legendProps?.patterns && { patterns: props.legendProps.patterns })}
      {...(CurveMap[curve] && { curve: CurveMap[curve] })}
    />
  );
}

const entry: PlaygroundEntry<AreaChartJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    linearChartProps: {
      type: 'group',
      groupName: 'Linear chart props',
      controls: {
        curve: {
          type: 'select',
          value: 'No curve',
          options: ['No curve', ...Curves],
          displayName: 'Curve',
        },
        showDots: {
          type: 'boolean',
          value: true,
          displayName: 'Dots',
        },
        stacked: {
          type: 'boolean',
          value: true,
          displayName: 'Stacked',
        },
      },
    },
    ...getDefaultChartControls(),
  },
  link: createGithubLink('d3-chart'),
  filterProps: ['data'],
};

export default entry;
