import React from 'react';
import { Plot, Line, minMax, PlotSummarizerConfig } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';

const a11yAltTextConfig: PlotSummarizerConfig = {
  titlesFormatter: (title) => {
    if (title === 'y') return 'Money volume';
    if (title === 'x') return 'Time';
  },
  valuesFormatter: (value, column) => {
    if (column === 'y') {
      return `$${Number(value).toFixed(2)}`;
    }
    if (column === 'x') {
      return `${value} s.`;
    }
  },
  override: 'text',

};

const a11yAltTextConfig1: PlotSummarizerConfig = {
  titlesFormatter: (title) => {
    if (title === 'y') return 'Money volume';
    if (title === 'x') return 'Time';
  },
  valuesFormatter: (value, column) => {
    if (column === 'y') {
      return `$${Number(value).toFixed(2)}`;
    }
    if (column === 'x') {
      return `${value} s.`;
    }
  },
  override: 'text',

  trendTangens: {
    static: 1 / 2,
    weak: 1 / 5,
    medium: 1 / 3,
    strong: Infinity,
  },
  movingAverage: {
    longSize: Math.sqrt(20),
    shortSize: Math.sqrt(20) / 2,
    notableDiff: 10,
  },
  dataType: 'points-cloud',
  clustersGridSize: 1,
  maxListSymbols: 10,
  datesWithTime: true,
  clustersLimit: 0,
  valuesLimit: 5,
  groupsLimit: 1,
  additionalFields: ['extraData1', 'extraData2'],
};

const eventEmitter = new (class PlotEventEmitterMock {
  on() {}
  off() {}
  emit() {}
})();

const Demo = () => {
  const width = 300;
  const height = 200;

  const xScale = scaleLinear().range([0, width]).domain(minMax(data, 'x'));
  const yScale = scaleLinear().range([height, 0]).domain(minMax(data, 'y'));

  return (
    <>
      <Plot
        data={data}
        scale={[xScale, yScale]}
        width={width}
        height={height}
        label='Last market trends with pattern'
        locale='en-US'
        a11yAltTextConfig={a11yAltTextConfig1}
        patterns
      >
        <Line x='x' y='y' />
      </Plot>

      <Plot
        data={data}
        scale={[xScale, yScale]}
        width={400}
        height={400}
        locale='en-US'
        a11yAltTextConfig={a11yAltTextConfig}

      >
        <Line x='x' y='y' />
      </Plot>
    </>
  );
};

const data = Array(20)
  .fill({})
  .map((_, i) => ({
    x: i,
    y: Math.sin(i / 2) * 5 + 5,
  }));

export default Demo;
