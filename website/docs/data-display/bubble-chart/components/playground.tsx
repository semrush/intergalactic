import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
// @ts-ignore
import { chartPlayground } from '@components/ChartPlayground';
import { Chart, BubbleChartProps } from '@semcore/d3-chart';
import resolveColor from '@semcore/ui/utils/lib/color';

const data = [
  { x: 2, y: 3, value: 5040, label: 'label 1' },
  { x: 1, y: 9, value: 40, label: 'label 2' },
  { x: 6, y: 2, value: 45634, label: 'label 3' },
  { x: 4, y: 7, value: 245, label: 'label 4' },
  { x: 9, y: 5, value: 7462, label: 'label 5' },
];

const Preview = (preview) => {
  const { select, radio, label, bool } = preview('Chart.Line');

  const {
    direction,
    alignItems,
    justifyContent,
    showXAxis,
    showYAxis,
    showTooltip,
    showLegend,
    legendProps,
  } = chartPlayground({ select, radio, label, bool });

  legendProps.shape = 'Circle';

  const chartProps: BubbleChartProps = {
    data,
    plotWidth: 500,
    plotHeight: 200,
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

  return <Chart.Bubble {...chartProps} />;
};

export default PlaygroundGeneration(Preview, { filterProps: ['data'] });
