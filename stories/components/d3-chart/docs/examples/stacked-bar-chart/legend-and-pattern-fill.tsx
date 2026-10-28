import Card from '@semcore/ui/card';
import { Chart } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import React from 'react';

import StackedBarMockData from '../../../__mocks__/stacked-bar';

const Demo = () => {
  const MARGIN = 30;
  const width = 500;
  const height = 300;

  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.bar))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .range([height - MARGIN, 0])
    .domain([0, 15]);

  return (
    <Card w='550px'>
      <Card.Header pt={4}>
        <Card.Title tag='h4' m={0} inline={true}>
          Chart legend
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Chart.Bar
          groupKey='bar'
          data={data}
          type='stack'
          plotWidth={width}
          plotHeight={height}
          xScale={xScale}
          yScale={yScale}
          showTooltip={false}
          patterns
          legendProps={legendProps}
          aria-label='Stacked bar chart'
        />
      </Card.Body>
    </Card>
  );
};

const data = StackedBarMockData.ThreeBars;

const legendProps = {
  legendMap: Object.keys(data[0])
    .filter((name) => name !== 'bar')
    .reduce<Record<string, { label: string }>>((acc, key, index) => {
      acc[key] = { label: `Category ${index + 1}` };

      return acc;
    }, {}),
};

export default Demo;
