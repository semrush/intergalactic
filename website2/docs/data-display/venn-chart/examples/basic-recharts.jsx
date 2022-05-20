import React from 'react';
import { VennChart, VennArea, Tooltip, ResponsiveContainer, getColor } from '@semcore/chart';

const data = [
  {
    name: 'Good',
    sets: ['G'],
    size: 200,
  },
  {
    name: 'Fast',
    sets: ['F'],
    size: 200,
  },
  {
    name: 'Cheap',
    sets: ['C'],
    size: 500,
  },
  {
    name: 'Unknown',
    sets: ['U'],
    size: 1,
  },
  {
    sets: ['G', 'F'],
    size: 100,
  },
  {
    sets: ['G', 'C'],
    size: 100,
  },
  {
    sets: ['F', 'C'],
    size: 100,
  },
  {
    sets: ['G', 'F', 'C'],
    size: 100,
  },
];

const Demo = () => (
  <ResponsiveContainer height={200}>
    <VennChart data={data}>
      <VennArea name="Good" fill={getColor('Good')} />
      <VennArea name="Fast" fill={getColor('Fast')} />
      <VennArea name="Cheap" fill={getColor('Cheap')} />
      <VennArea name="Unknown" fill={getColor('Unknown')} />
      <Tooltip />
    </VennChart>
  </ResponsiveContainer>
);

export default Demo;
