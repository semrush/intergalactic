import React from 'react';
import {
  Plot,
  ScatterPlot,
  XAxis,
  YAxis,
  minMax,
  ChartLegend,
  LegendItem,
} from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import resolveColor from '@semcore/utils/lib/color';

const lineColors = {
  1: resolveColor('blue-300'),
  2: resolveColor('green-200'),
  3: resolveColor('orange-400'),
};

export default () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  const legendItems = Object.keys(data[0])
    .filter((name) => name !== 'x' && name !== 'value')
    .map((item) => {
      return {
        id: item,
        label: `Point ${item}`,
        checked: true,
        color: lineColors[item],
      };
    });

  return (
    <>
      <ChartLegend items={legendItems} shape={'Square'} />
      <Plot scale={[xScale, yScale]} width={width} height={height} data={data}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        {legendItems
          .filter((item) => item.checked)
          .map((item, index) => {
            return (
              <ScatterPlot key={item.id} x={'x'} y={item.id} value={'value'} color={item.color} />
            );
          })}
      </Plot>
    </>
  );
};

const data = Array(10)
  .fill({})
  .map((d, i) => ({
    x: i,
    1: Math.random() * 10,
    2: Math.random() * 10,
    3: Math.random() * 10,
    value: i,
  }));
