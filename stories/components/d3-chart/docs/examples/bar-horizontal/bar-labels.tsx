import { useColorResolver } from '@semcore/ui/core/lib/utils/use/useColorResolver';
import { Plot, HorizontalBar, YAxis } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import React from 'react';

import BarMockData from '../../../__mocks__/bar';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const resolveColor = useColorResolver();
  const xScale = scaleLinear()
    .range([MARGIN * 2, width - MARGIN * 2])
    .domain([0, Math.max(...data.map((d) => d.bar))]);

  const yScale = scaleBand()
    .range([height - MARGIN, MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks primaryText />
      </YAxis>
      <HorizontalBar x='bar' y='category'>
        {({ index, x, y, width, height }) => {
          return {
            children: (
              <text
                x={x + width + 16}
                y={y + height / 2}
                textAnchor='start'
                alignmentBaseline='middle'
                fill={resolveColor('--intergalactic-text-secondary')}
              >
                $
                {' '}
                {data[index].bar}
              </text>
            ),
          };
        }}
      </HorizontalBar>
    </Plot>
  );
};

const data = BarMockData.Default;

export default Demo;
