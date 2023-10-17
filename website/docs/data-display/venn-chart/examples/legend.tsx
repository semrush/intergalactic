import React from 'react';
import { Plot, Venn, colors } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import { ChartLegend } from '@semcore/d3-chart';
import resolveColor from '@semcore/utils/lib/color';

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
    color: resolveColor('blue'),
  },
  {
    id: 'F',
    label: 'Fast',
    checked: true,
    color: resolveColor('green'),
  },
  {
    id: 'C',
    label: 'Cheap',
    checked: true,
    color: resolveColor('orange'),
  },
  {
    id: 'U',
    label: 'Unknown',
    checked: true,
    color: resolveColor('pink'),
  },
];

export default () => {
  return (
    <>
      <ChartLegend.Flex items={legendItems} shape={'Line'} />
      <Plot height={300} width={400} data={data}>
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
