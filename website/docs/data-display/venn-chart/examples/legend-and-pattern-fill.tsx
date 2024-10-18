import React from 'react';
import { Plot, Venn, colors } from 'intergalactic/d3-chart';
import { Text } from 'intergalactic/typography';
import { ChartLegend } from '@semcore/d3-chart';

const data = {
  G: 200,
  F: 200,
  C: 500,
  U: 1,
  'G/F': 100,
  'G/C': 100,
  'F/C': 100,
  'G/F/C': 100,
};

const legendItems = [
  {
    id: 'G',
    label: 'Good',
    checked: true,
    color: 'chart-palette-order-1',
  },
  {
    id: 'F',
    label: 'Fast',
    checked: true,
    color: 'chart-palette-order-2',
  },
  {
    id: 'C',
    label: 'Cheap',
    checked: true,
    color: 'chart-palette-order-3',
  },
  {
    id: 'U',
    label: 'Unknown',
    checked: true,
    color: 'chart-palette-order-4',
  },
];

const Demo = () => {
  return (
    <>
      <ChartLegend items={legendItems} patterns aria-label={'Legend for the venn chart'} />
      <Plot height={300} width={400} data={data} patterns>
        <Venn>
          <Venn.Circle dataKey='G' name='Good' />
          <Venn.Circle dataKey='F' name='Fast' color={colors['blue-03']} />
          <Venn.Circle dataKey='C' name='Cheap' color={colors['orange-04']} />
          <Venn.Circle dataKey='U' name='Unknown' color={colors['pink-03']} />
          <Venn.Intersection dataKey='G/F' name='Good & Fast' />
          <Venn.Intersection dataKey='G/C' name='Good & Cheap' />
          <Venn.Intersection dataKey='F/C' name='Fast & Cheap' />
          <Venn.Intersection dataKey='G/F/C' name='Good & Fast & Cheap' />
        </Venn>
        <Venn.Tooltip>
          {({ name, dataKey }) => {
            return {
              children: (
                <>
                  <Venn.Tooltip.Title>{name}</Venn.Tooltip.Title>
                  <Text bold>{data[dataKey]}</Text>
                </>
              ),
            };
          }}
        </Venn.Tooltip>
      </Plot>
    </>
  );
};

export default Demo;
