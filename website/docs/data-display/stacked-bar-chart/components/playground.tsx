import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
// @ts-ignore
import { chartPlayground } from '@components/ChartPlayground';
import { Chart, BarChartProps } from '@semcore/d3-chart';

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
  Line3: Math.random() * 10,
}));

const Preview = (preview) => {
  const { select, radio, label, bool } = preview('Chart.Bar');

  const {
    direction,
    alignItems,
    justifyContent,
    hideXAxis,
    hideYAxis,
    hideTooltip,
    showTotalInTooltip,
    hideLegend,
    legendProps,
  } = chartPlayground({ select, radio, label, bool }, { showTotalInTooltip: true });

  const chartProps: BarChartProps = {
    data,
    groupKey: 'x',
    plotWidth: 500,
    plotHeight: 300,
    showTotalInTooltip,
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

  return <Chart.Bar {...chartProps} type={'stack'} />;
};

export default PlaygroundGeneration(Preview);
