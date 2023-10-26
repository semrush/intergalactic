import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
// @ts-ignore
import { chartPlayground } from '@components/ChartPlayground';
import { Chart, RadarChartProps, colors } from '@semcore/d3-chart';

const colorMap = {
  data_1: colors['orange-04'],
  data_2: colors['violet-04'],
};

const data = {
  categories: ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6'],
  data_1: [1, 3, 5, 5, 9, 2],
  data_2: [5, 2, 1, 2, 7, 6],
};

const Preview = (preview) => {
  const { select, radio, label, bool } = preview('Chart.Radar');

  const {
    direction,
    alignItems,
    justifyContent,
    hideXAxis,
    hideYAxis,
    hideTooltip,
    hideLegend,
    legendProps,
  } = chartPlayground({ select, radio, label, bool });

  label({ label: 'Linear chart props', key: 'linearChartProps' });

  const hideDots = bool({
    key: 'hideDots',
    defaultValue: false,
    label: 'Hide dots',
  });

  const circle = bool({
    key: 'circle',
    defaultValue: false,
    label: 'Circle',
  });

  const chartProps: RadarChartProps = {
    data,
    groupKey: 'categories',
    plotWidth: 500,
    plotHeight: 500,
    colorMap,
    direction,
    hideTooltip,
    hideXAxis,
    hideYAxis,
    alignItems,
    justifyContent,
    hideDots,
    circle,
  };

  if (hideLegend) {
    chartProps.hideLegend = true;
  } else {
    chartProps.legendProps = legendProps;
  }

  return <Chart.Radar {...chartProps} />;
};

export default PlaygroundGeneration(Preview);
