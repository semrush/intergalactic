import { Plot, ReferenceBackground, XAxis, YAxis } from '@semcore/ui/d3-chart';
import { scaleBand, scaleLinear } from 'd3-scale';
import React from 'react';

import BarMockData from '../../../__mocks__/bar';

const backgroundTokens = [
  'chart-grid-bg-bad',
  'chart-grid-bg-good',
  'chart-grid-bg-highlight',
  'chart-grid-bg-insight',
  'chart-grid-bg-pattern',
  'chart-grid-bg-potential',
] as const;

const Demo = () => {
  const MARGIN = 40;
  const width = 360;
  const height = 220;

  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(dataBar.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  const startValue = dataBar[1].category;
  const endValue = dataBar[3].category;
  const xStart = (xScale(startValue) ?? 0) + xScale.bandwidth() / 2;
  const xEnd = (xScale(endValue) ?? 0) + xScale.bandwidth() / 2;
  const yTop = yScale.range()[1];
  const bgWidth = xEnd - xStart;
  const bgHeight = yScale.range()[0] - yScale.range()[1];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(360px, 1fr))', gap: 16 }}>
      {backgroundTokens.map((token) => (
        <div key={token}>
          <div style={{ position: 'relative', width, height }}>
            <div
              style={{
                position: 'absolute',
                left: xStart,
                top: yTop,
                width: bgWidth,
                height: bgHeight,
                background: `var(--intergalactic-${token})`,
              }}
            />
            <Plot
              data={dataBar}
              scale={[xScale, yScale]}
              width={width}
              height={height}
              style={
                {
                  '--intergalactic-chart-grid-period-bg': 'transparent',
                } as React.CSSProperties
              }
            >
              <ReferenceBackground value={startValue} endValue={endValue} />
              <YAxis>
                <YAxis.Ticks />
              </YAxis>
              <XAxis>
                <XAxis.Ticks />
              </XAxis>
            </Plot>
          </div>
        </div>
      ))}
    </div>
  );
};

const dataBar = BarMockData.Default;

export default Demo;
