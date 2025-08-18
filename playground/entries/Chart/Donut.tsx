import { Chart } from '@semcore/d3-chart';
import React from 'react';

import ChartControls from './common/controls';
import type { CommonChartProps, LegendChartProps } from './common/controls';
import type { JSXProps } from '../../types/JSXProps';
import type { PlaygroundEntry } from '../../types/Playground';
import createGithubLink from '../../utils/createGHLink';

type DonutChartProps = {
  commonChartProps: CommonChartProps;
  legendProps: LegendChartProps;
  donutProps: {
    halfsize: boolean;
    innerRadius: number;
    innerLabel: string;
  };
};
export type DonutChartJSXProps = JSXProps<DonutChartProps>;

const data = {
  a: 3,
  b: 1,
  c: 2,
};

function getJSX(props: DonutChartJSXProps) {
  const legendProps = {
    ...props.legendProps,
    legendMap: {
      a: { label: 'Nuts' },
      b: { label: 'Fruits' },
      c: { label: 'Milk' },
    },
  };
  return (
    <Chart.Donut
      plotWidth={300}
      plotHeight={200}
      data={data}
      {...props.donutProps}
      {...props.commonChartProps}
      {...(props.legendProps && { legendProps })}
      {...(props.legendProps?.patterns && { patterns: props.legendProps.patterns })}
    />
  );
}

const entry: PlaygroundEntry<DonutChartJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    ...ChartControls,
    donutProps: {
      type: 'group',
      groupName: 'Donut props',
      controls: {
        halfsize: {
          type: 'boolean',
          value: false,
          displayName: 'Half size',
        },
        innerRadius: {
          type: 'text-number',
          value: 60,
          displayName: 'Inner Radius',
        },
        innerLabel: {
          type: 'text',
          value: 'Example',
          displayName: 'Inner Label',
        },
      },
    },
  },
  link: createGithubLink('d3-chart'),
  filterProps: ['data'],
};

export default entry;
