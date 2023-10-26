import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
// @ts-ignore
import { chartPlayground } from '@components/ChartPlayground';
import { Chart, BarChartProps } from '@semcore/d3-chart';
import resolveColor from '@semcore/ui/utils/lib/color';

const lineColors = {
  Line1: resolveColor('blue-300'),
  Line2: resolveColor('green-200'),
};

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
    hideXAxis,
    hideYAxis,
    hideTooltip,
    hideLegend,
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
    plotHeight: 300,
    colorMap: lineColors,
    showTotalInTooltip,
    direction,
    hideTooltip,
    hideXAxis,
    hideYAxis,
    alignItems,
    justifyContent,
    trend: withTrend ? trendData : undefined,
  };

  if (hideLegend) {
    chartProps.hideLegend = true;
  } else {
    chartProps.legendProps = legendProps;
  }

  return <Chart.Bar {...chartProps} />;
};

export default PlaygroundGeneration(Preview);
