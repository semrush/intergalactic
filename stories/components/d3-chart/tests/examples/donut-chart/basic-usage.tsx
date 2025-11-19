import type { DonutChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps } from '../stories_props_helper';

const Demo = (props: DonutChartProps) => {
  return (
    <div style={{ width: '650px' }}>
      <Chart.Donut
        {...props}
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

export const defaultProps = getChartProps<DonutChartProps>({
  data,
});

Demo.defaultProps = defaultProps;

export default Demo;
