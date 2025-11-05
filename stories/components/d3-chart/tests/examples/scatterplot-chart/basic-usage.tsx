import type { ScatterPlotChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps } from '../stories_props_helper';

const Demo = (props: ScatterPlotChartProps) => {
  const onClickHandler = () => {
    console.log('Clicked scatterplot item');
  };
  return (
    <Chart.ScatterPlot
      {...props}
      aria-label='ScatterPlot chart'
      onClickScatterItem={onClickHandler}
    />
  );
};

const data = Array.from({ length: 20 }, (_, i) => ({
  x: i,
  y: (i % 5) + 1,
}));
export const defaultProps = getChartProps<ScatterPlotChartProps>({
  data,
  groupKey: 'x',
});

export default Demo;
