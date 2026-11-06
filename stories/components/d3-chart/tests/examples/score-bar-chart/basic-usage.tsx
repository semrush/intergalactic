import { Box } from '@semcore/ui/base-components';
import type { ScoreBarChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

const Demo = (props: ScoreBarChartProps) => {
  const { plotWidth, plotHeight, ...chartProps } = getPropsToChart(props);

  return (
    <Box
      w={plotWidth}
    >
      <Chart.ScoreBar
        {...chartProps}
        aria-label='ScoreBar chart'
      />
    </Box>
  );
};

const data = [
  {
    category: 'Schema.org (Microdata)',
    value: 0,
  },
  {
    category: 'Open graph',
    value: 9650,
  },
  {
    category: 'Twitter cards',
    value: 7650,
  },
  {
    category: 'Microformats',
    value: 14650,
  },
  {
    category: 'Schema.org (JSON-LD)',
    value: 135650,
  },
];

export const defaultProps = getChartProps<ScoreBarChartProps>({
  y: 'category',
  x: 'value',
  marginX: 0,
  marginY: 0,
  plotHeight: 350,
  showXAxis: false,
  data,
});

Demo.defaultProps = defaultProps;

export default Demo;
