import React from 'react';
import { Plot, CigarettesPack } from 'intergalactic/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';

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
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <CigarettesPack x='value' y='category'>
        <CigarettesPack.Hover />
        <CigarettesPack.Tooltip>
          {({ index }) => {
            return {
              children: (
                <>
                  <CigarettesPack.Tooltip.Title>
                    {data[index].category}
                  </CigarettesPack.Tooltip.Title>
                  <Flex justifyContent='space-between'>
                    <CigarettesPack.Tooltip.Dot mr={4}>Bar</CigarettesPack.Tooltip.Dot>
                    <Text bold>{data[index].value}</Text>
                  </Flex>
                </>
              ),
            };
          }}
        </CigarettesPack.Tooltip>
        <CigarettesPack.Annotation>
          <CigarettesPack.Label />
          <CigarettesPack.Percent />
          <CigarettesPack.Value />
        </CigarettesPack.Annotation>
        <CigarettesPack.Bar>
          <CigarettesPack.Bar.Background />
          <CigarettesPack.Bar.Fill />
        </CigarettesPack.Bar>
      </CigarettesPack>
    </Plot>
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
