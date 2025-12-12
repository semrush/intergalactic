import type { ScatterPlotChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

const Demo = (props: ScatterPlotChartProps) => {
  const onClickHandler = () => {
    console.log('Clicked scatterplot item');
  };
  return (
    <Chart.ScatterPlot
      {...getPropsToChart(props)}
      aria-label='ScatterPlot chart'
      onClickScatterItem={onClickHandler}
    />
  );
};

const data = Array(10)
  .fill({})
  .map((d, i) => ({
    x: i,
    y1: Math.random() * 10,
    y2: Math.random() * 10,
    value: i,
  }));
export const defaultProps = getChartProps<ScatterPlotChartProps>({
  data,
  groupKey: 'x',
});

Demo.defaultProps = defaultProps;

export default Demo;
