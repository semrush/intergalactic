import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
// @ts-ignore
import { chartPlayground } from '@components/ChartPlayground';
import { Chart } from '@semcore/d3-chart';
import { HistogramChartProps } from '@semcore/d3-chart/src/component/Chart/HistogramChart.type';

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
}));

const Preview = (preview) => {
  const { select, radio, label, bool } = preview('Chart.Histogram');

  const {
    direction,
    alignItems,
    justifyContent,
    showTotalInTooltip,
    showXAxis,
    showYAxis,
    showTooltip,
    showLegend,
    legendProps,
  } = chartPlayground({ select, radio, label, bool });

  const chartProps: HistogramChartProps = {
    data,
    groupKey: 'x',
    plotWidth: 500,
    plotHeight: 200,
    showTotalInTooltip,
    direction,
    showTooltip,
    showXAxis,
    showYAxis,
    alignItems,
    justifyContent,
  };

  if (showLegend) {
    chartProps.legendProps = legendProps;
  } else {
    chartProps.showLegend = false;
  }

  return <Chart.Histogram {...chartProps} />;
};

export default PlaygroundGeneration(Preview, { filterProps: ['data'] });
