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
    innerLabel: string;
    innerDescription: string;
  };
};
export type DonutChartJSXProps = JSXProps<DonutChartProps>;

const data = {
  value: 33,
};

function getJSX(props: DonutChartJSXProps) {
  const legendProps = {
    ...props.legendProps,
  };
  const { innerLabel, innerDescription, ...donutProps } = props.donutProps;
  return (
    <Chart.ScoreDonut
      plotWidth={300}
      plotHeight={200}
      data={data}
      aria-label='Donut chart'
      {...donutProps}
      innerLabel={[innerLabel, innerDescription]}
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
        innerLabel: {
          type: 'text',
          value: '33%',
          displayName: 'Inner Label',
        },
        innerDescription: {
          type: 'text',
          value: 'Example',
          displayName: 'Inner Description',
        },
      },
    },
    ...getDefaultChartControls({
      skip: {
        commonChartProps: ['showTotalInTooltip'],
        legendProps: ['direction'],
      },
      add: {
        legendProps: {
          shape: {
            type: 'select',
            value: 'Circle',
            options: ['Checkbox', 'Circle', 'Pattern'],
            displayName: 'Shape',
          },
        },
      },
    }),
  },
  link: createGithubLink('d3-chart'),
  filterProps: ['data'],
};

export default entry;
