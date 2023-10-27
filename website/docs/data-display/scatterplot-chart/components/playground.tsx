import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
// @ts-ignore
import { chartPlayground } from '@components/ChartPlayground';
import { Chart, ScatterPlotChartProps } from '@semcore/d3-chart';

const data = [...Array(25).keys()].map((d, i) => ({
  x: i,
  y: Math.random() * 10,
  y2: Math.random() * 10,
  value: Math.round(Math.random() * 10),
}));

const Preview = (preview) => {
  const { select, radio, label, bool } = preview('Chart.ScatterPlot');

  const {
    direction,
    alignItems,
    justifyContent,
    hideXAxis,
    hideYAxis,
    hideTooltip,
    hideLegend,
    legendProps,
  } = chartPlayground({ select, radio, label, bool }, { direction: 'column' });

  const chartProps: ScatterPlotChartProps = {
    data,
    groupKey: 'x',
    plotWidth: 500,
    plotHeight: 300,
    direction,
    hideTooltip,
    hideXAxis,
    hideYAxis,
    alignItems,
    justifyContent,
  };

  if (hideLegend) {
    chartProps.hideLegend = true;
  } else {
    chartProps.legendProps = legendProps;
  }

  return <Chart.ScatterPlot {...chartProps} valueKey={'value'} xTicksCount={10} yTicksCount={6} />;
};

export default PlaygroundGeneration(Preview);
