import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
// @ts-ignore
import { chartPlayground } from '@components/ChartPlayground';
import { Chart, LineChartProps } from '@semcore/d3-chart';
import { curveCardinal, curveLinearClosed, curveBumpX } from 'd3-shape';

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
  Line3: Math.random() * 10,
}));

const area = {
  Line1: data.map((item) => {
    return {
      x: item.x,
      y0: item.Line1 - 1,
      y1: item.Line1 + 1,
    };
  }),
  Line2: data.map((item) => {
    return {
      x: item.x,
      y0: item.Line2 - 1,
      y1: item.Line2 + 1,
    };
  }),
  Line3: data.map((item) => {
    return {
      x: item.x,
      y0: item.Line3 - 1,
      y1: item.Line3 + 1,
    };
  }),
};

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
    hideLegend,
    legendProps,
    showTotalInTooltip,
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
    label: 'hide dots',
  });

  const withArea = bool({
    key: 'withArea',
    defaultValue: false,
    label: 'Enable area',
  });

  const areaCurve = select({
    key: 'areaCurve',
    defaultValue: 'No curve',
    label: 'Area Curve',
    options: ['No curve', ...Object.keys(curveMap)],
  });

  const chartProps: LineChartProps = {
    data,
    groupKey: 'x',
    plotWidth: 500,
    plotHeight: 200,
    showTotalInTooltip,
    direction,
    hideTooltip,
    hideDots,
    curve: curveMap[curveName],
    hideXAxis,
    hideYAxis,
    alignItems,
    justifyContent,
    area: withArea ? area : undefined,
    areaCurve: curveMap[areaCurve],
  };

  if (hideLegend) {
    chartProps.hideLegend = true;
  } else {
    chartProps.legendProps = legendProps;
  }

  return <Chart.Line {...chartProps} />;
};

export default PlaygroundGeneration(Preview, { filterProps: ['data'] });
