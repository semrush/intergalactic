import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
// @ts-ignore
import { chartPlayground } from '@components/ChartPlayground';
import { Chart, DonutChartProps } from '@semcore/d3-chart';

const data = {
  a: 3,
  b: 1,
  c: 2,
};

const Preview = (preview) => {
  const { select, radio, label, bool, text } = preview('ChartDonut');

  const {
    direction,
    alignItems,
    justifyContent,
    hideXAxis,
    hideYAxis,
    hideTooltip,
    hideLegend,
    legendProps,
  } = chartPlayground(
    { select, radio, label, bool },
    { direction: 'row-reverse', legendDirection: 'column' },
  );

  label({ label: 'Donut props', key: 'donutProps' });

  const halfSize = bool({
    key: 'halfSize',
    defaultValue: false,
    label: 'Half size',
  });

  const innerRadius = text({
    key: 'innerRadius',
    defaultValue: 100,
    label: 'Inner Radius',
  });

  const innerLabel = text({
    key: 'innerLabel',
    defaultValue: 'Example',
    label: 'Inner Label',
  });

  legendProps.legendMap = {
    a: { label: 'Nuts' },
    b: { label: 'Fruits' },
    c: { label: 'Milk' },
  };

  const chartProps: DonutChartProps = {
    data,
    plotWidth: 300,
    plotHeight: 300,
    direction,
    hideTooltip,
    hideXAxis,
    hideYAxis,
    alignItems,
    justifyContent,
    halfsize: halfSize,
    innerRadius,
    innerLabel,
  };

  if (hideLegend) {
    chartProps.hideLegend = true;
  } else {
    chartProps.legendProps = legendProps;
  }

  return <Chart.Donut {...chartProps} />;
};

export default PlaygroundGeneration(Preview, { filterProps: ['data'] });
