import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
// @ts-ignore
import { chartPlayground } from '@components/ChartPlayground';
import { Chart, AreaChartProps } from '@semcore/d3-chart';
import resolveColor from '@semcore/ui/utils/lib/color';
import { curveCardinal, curveLinearClosed, curveBumpX } from 'd3-shape';

const lineColors = {
  Line1: resolveColor('blue-300'),
  Line2: resolveColor('green-200'),
  Line3: resolveColor('orange-400'),
};

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
  const { select, radio, label, bool } = preview('Chart.Line');

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
  } = chartPlayground({ select, radio, label, bool });

  label({ label: 'Linear chart props', key: 'linearChartProps' });

  const curveName = select({
    key: 'curveName',
    defaultValue: 'No curve',
    label: 'Curve',
    options: ['No curve', ...Object.keys(curveMap)],
  });

  const hideDots = bool({
    key: 'hideDots',
    defaultValue: false,
    label: 'Hide dots',
  });

  const stacked = bool({
    key: 'stacked',
    defaultValue: true,
    label: 'Is stacked',
  });

  const chartProps: AreaChartProps = {
    data,
    groupKey: 'x',
    plotWidth: 500,
    plotHeight: 300,
    colorMap: lineColors,
    showTotalInTooltip,
    direction,
    hideTooltip,
    hideDots,
    curve: curveMap[curveName],
    hideXAxis,
    hideYAxis,
    alignItems,
    justifyContent,
    stacked,
  };

  if (hideLegend) {
    chartProps.hideLegend = true;
  } else {
    chartProps.legendProps = legendProps;
  }

  return <Chart.Area {...chartProps} />;
};

export default PlaygroundGeneration(Preview);
