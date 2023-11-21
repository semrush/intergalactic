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
}));

const trendData = {
  Line1: data.map((item) => {
    return {
      x: item.x,
      y: item.Line1 - 0.5,
    };
  }),
  Line2: data.map((item) => {
    return {
      x: item.x,
      y: item.Line2 - 0.5,
    };
  }),
};

const Preview = (preview) => {
  const { select, radio, label, bool } = preview('Chart.Bar');

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

  const withTrend = bool({
    key: 'withTrend',
    defaultValue: false,
    label: 'With trend',
  });

  const chartProps: BarChartProps = {
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
    trend: withTrend ? trendData : undefined,
  };

  if (showLegend) {
    chartProps.legendProps = legendProps;
  } else {
    chartProps.showLegend = false;
  }

  return <Chart.Bar {...chartProps} />;
};

export default PlaygroundGeneration(Preview, { filterProps: ['data'] });
