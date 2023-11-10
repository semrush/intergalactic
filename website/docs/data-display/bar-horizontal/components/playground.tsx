import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
// @ts-ignore
import { chartPlayground } from '@components/ChartPlayground';
import { Chart, BarChartProps } from '@semcore/d3-chart';
import resolveColor from '@semcore/ui/utils/lib/color';

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
}));

const Preview = (preview) => {
  const { select, radio, label, bool } = preview('Chart.Bar');

  const {
    direction,
    alignItems,
    showTotalInTooltip,
    justifyContent,
    showXAxis,
    showYAxis,
    showTooltip,
    showLegend,
    legendProps,
  } = chartPlayground({ select, radio, label, bool }, { invertAxis: true });

  const chartProps: BarChartProps = {
    data,
    groupKey: 'x',
    plotWidth: 500,
    plotHeight: 300,
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
    chartProps.showLegend = true;
  }

  return <Chart.Bar {...chartProps} invertAxis={true} />;
};

export default PlaygroundGeneration(Preview, { filterProps: ['data'] });
