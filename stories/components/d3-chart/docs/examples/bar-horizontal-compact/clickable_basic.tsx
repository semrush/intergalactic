import React from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/flex-box';
import { Chart } from '@semcore/d3-chart';

const Demo = () => {
  const MARGIN = 30;
  const width = 500;
  const height = 500;

  const sum = data.reduce((acc, d) => acc + d.value, 0);

  const xScale = scaleLinear().range([0, width]).domain([0, sum]);

  const yScale = scaleBand()
    .range([height - MARGIN, MARGIN])
    .domain([...data].reverse().map((d) => d.category))
    .paddingInner(0.6)
    .paddingOuter(0.2);

  return (
    <Flex flexWrap gap={5}>
      <Chart.CompactHorizontalBar
        y={'category'}
        x={'value'}
        data={data}
        plotWidth={500}
        plotHeight={450}
        onClickBar={(barIndex) => alert(`Bar ${barIndex} clicked`)}
        aria-label={'CompactHorizontalBar chart'}
      />
    </Flex>
  );
};

const data = [
  {
    category: 'Schema.org (Microdata)',
    value: 0,
  },
  {
    category: 'Open graph',
    value: 9650,
  },
  {
    category: 'Twitter cards',
    value: 7650,
  },
  {
    category: 'Microformats',
    value: 14650,
  },
  {
    category: 'Schema.org (JSON-LD)',
    value: 135650,
  },
];

export default Demo;
