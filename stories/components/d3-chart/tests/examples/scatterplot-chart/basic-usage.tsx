import { Box } from '@semcore/ui/base-components';
import type { ScatterPlotChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

const Demo = (props: ScatterPlotChartProps) => {
  const onClickHandler = () => {
    console.log('Clicked scatterplot item');
  };
  const { plotWidth, plotHeight, ...chartProps } = getPropsToChart(props);

  return (
    <Box
      border='1px solid #ddd'
      borderRadius='surface-rounded'
      resize='both'
      w={plotWidth}
      h={plotHeight}
      overflow='auto'
    >
      <Chart.ScatterPlot
        {...chartProps}
        aria-label='ScatterPlot chart'
        onClickScatterItem={onClickHandler}
      />
    </Box>
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

Demo.defaultProps = defaultProps;

export default Demo;
