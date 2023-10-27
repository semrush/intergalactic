import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
// @ts-ignore
import { chartPlayground } from '@components/ChartPlayground';
import { Chart, VennChartProps } from '@semcore/d3-chart';

const data = {
  G: 200,
  F: 200,
  C: 500,
  U: 1,
  'G/F': 100,
  'G/C': 100,
  'F/C': 100,
  'G/F/C': 100,
};

const Preview = (preview) => {
  const { select, radio, label, bool } = preview('Chart.Venn');

  const {
    direction,
    alignItems,
    justifyContent,
    hideLegend,
    hideXAxis,
    hideYAxis,
    hideTooltip,
    legendProps,
  } = chartPlayground({ select, radio, label, bool });

  legendProps.legendMap = {
    G: { label: 'Good' },
    F: { label: 'Fast' },
    C: { label: 'Clean' },
    U: { label: 'Uniq' },
  };

  const chartProps: VennChartProps = {
    data,
    plotWidth: 300,
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

  return <Chart.Venn {...chartProps} />;
};

export default PlaygroundGeneration(Preview);
