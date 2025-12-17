import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getDefaultChartControls } from './common/controls';
import type { CommonChartProps, LegendChartProps } from './common/controls';
import type { JSXProps } from '../../types/JSXProps';
import type { PlaygroundEntry } from '../../types/Playground';
import createGithubLink from '../../utils/createGHLink';

type VennChartProps = {
  commonChartProps: Omit<CommonChartProps, 'showXAxis' | 'showYAxis' | 'showTotalInTooltip'>;
  legendProps: Omit<LegendChartProps, 'direction'>;
};
export type VennChartJSXProps = JSXProps<VennChartProps>;

const data = {
  'G': 200,
  'F': 200,
  'C': 500,
  'G/F': 100,
  'G/C': 100,
  'F/C': 100,
};

function getJSX(props: VennChartJSXProps) {
  const legendProps = {
    ...props.legendProps,
    legendMap: {
      G: { label: 'Good' },
      F: { label: 'Fast' },
      C: { label: 'Clean' },
    },
  };
  return (
    <Chart.Venn
      plotWidth={200}
      plotHeight={200}
      data={data}
      aria-label='Venn chart'
      {...props.commonChartProps}
      {...(props.legendProps && {
        legendProps: legendProps,
        showLegend: props.commonChartProps.showLegend as true,
      })}
      {...(props.legendProps?.patterns && { patterns: props.legendProps.patterns })}
    />
  );
}

const entry: PlaygroundEntry<VennChartJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    ...getDefaultChartControls({
      skip: {
        commonChartProps: ['showXAxis', 'showYAxis', 'showTotalInTooltip'],
        legendProps: ['direction'],
      },
    }),
  },
  link: createGithubLink('d3-chart'),
  filterProps: ['data'],
};

export default entry;
