import type { DonutChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

const Demo = (props: DonutChartProps) => {
  return (
    <div style={{ width: '650px' }}>
      <Chart.Donut
        {...getPropsToChart(props)}
        aria-label='Donut chart'
      />
    </div>
  );
};

const data = {
  a: 3,
  b: 1,
  c: 2,
};

const propsFromHelper = getChartProps<DonutChartProps>({
  data,
});

// Remove showLegend from defaultProps to allow DonutChart's internal logic to work
// (auto-hide legend when data has only 1 item)
const { showLegend, ...defaultProps } = propsFromHelper as any;

export { defaultProps };

Demo.defaultProps = defaultProps;

export default Demo;
