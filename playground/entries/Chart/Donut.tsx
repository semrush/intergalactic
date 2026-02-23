import { Chart } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
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
      aria-label='Donut chart'
      {...props.donutProps}
      innerLabel={(
        props.donutProps.halfsize
          ? (
              <Text tag='tspan' dy='-1em'>
                {props.donutProps.innerLabel}
              </Text>
            )
          : props.donutProps.innerLabel
      )}
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
