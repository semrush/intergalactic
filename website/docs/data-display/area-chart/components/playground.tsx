import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
// @ts-ignore
import { chartPlayground } from '@components/ChartPlayground';
import { Chart, AreaChartProps } from '@semcore/d3-chart';
import { curveCardinal, curveLinearClosed, curveBumpX } from 'd3-shape';

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
  Line3: Math.random() * 10,
}));

const curveMap = {
  curveCardinal,
  curveLinearClosed,
  curveBumpX,
};

const Preview = (preview) => {
  const { select, radio, label, bool } = preview('Chart.Area');

  const {
    direction,
    alignItems,
    justifyContent,
    showXAxis,
    showYAxis,
    showTotalInTooltip,
    showTooltip,
    showLegend,
    legendProps,
  } = chartPlayground({ select, radio, label, bool });

  label({ label: 'Linear chart props', key: 'linearChartProps' });

  const curveName = select({
    key: 'curveName',
    defaultValue: 'No curve',
    label: 'Curve',
    options: ['No curve', ...Object.keys(curveMap)],
  });

  const showDots = bool({
    key: 'showDots',
    defaultValue: true,
    label: 'Show dots',
  });

  const stacked = bool({
    key: 'stacked',
    defaultValue: false,
    label: 'Is stacked',
  });

  const chartProps: AreaChartProps = {
    data,
    groupKey: 'x',
    plotWidth: 500,
    plotHeight: 200,
    showTotalInTooltip,
    direction,
    showTooltip,
    showDots,
    curve: curveMap[curveName],
    showXAxis,
    showYAxis,
    alignItems,
    justifyContent,
    stacked,
  };

  if (showLegend) {
    chartProps.legendProps = legendProps;
  } else {
    chartProps.showLegend = true;
  }

  return <Chart.Area {...chartProps} />;
};

export default PlaygroundGeneration(Preview, { filterProps: ['data'] });
