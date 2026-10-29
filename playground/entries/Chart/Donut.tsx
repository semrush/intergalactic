import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getDefaultChartControls } from './common/controls';
import type { CommonChartProps, LegendChartProps } from './common/controls';
import type { JSXProps } from '../../types/JSXProps';
import type { PlaygroundEntry } from '../../types/Playground';
import createGithubLink from '../../utils/createGHLink';

type DonutChartProps = {
  commonChartProps: Omit<CommonChartProps, 'showTotalInTooltip'>;
  legendProps: Omit<LegendChartProps, 'direction'>;
  donutProps: {
    halfsize: boolean;
    showInnerLabel: boolean;
    label: string;
    description: string;
  };
};
export type DonutChartJSXProps = JSXProps<DonutChartProps>;

const data = {
  a: 3,
  b: 1,
  c: 2,
};

function getJSX(props: DonutChartJSXProps) {
  const { halfsize, showInnerLabel, label, description } = props.donutProps;
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
      plotWidth={180}
      plotHeight={halfsize ? 90 : 180}
      data={data}
      aria-label='Donut chart'
      halfsize={halfsize}
      {...(showInnerLabel ? { innerLabel: [label, description] as [string, string] } : {})}
      {...props.commonChartProps}
      {...(props.legendProps && {
        legendProps,
        showLegend: props.commonChartProps.showLegend as true,
      })}
      {...(props.legendProps?.patterns && { patterns: props.legendProps.patterns })}
    />
  );
}

const entry: PlaygroundEntry<DonutChartJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    donutProps: {
      type: 'group',
      groupName: 'Donut props',
      controls: {
        halfsize: {
          type: 'boolean',
          value: false,
          displayName: 'Half size',
        },
        showInnerLabel: {
          type: 'boolean',
          value: true,
          displayName: 'Inner label',
        },
        label: {
          type: 'text',
          value: 'Metric',
          displayName: 'Label',
          visibleIf: [{ dependsOn: 'showInnerLabel.donutProps', equals: true }],
        },
        description: {
          type: 'text',
          value: 'Description',
          displayName: 'Description',
          visibleIf: [{ dependsOn: 'showInnerLabel.donutProps', equals: true }],
        },
      },
    },
    ...getDefaultChartControls({
      skip: {
        commonChartProps: ['showTotalInTooltip'],
        legendProps: ['direction'],
      },
    }),
  },
  link: createGithubLink('d3-chart'),
  filterProps: ['data'],
};

export default entry;
