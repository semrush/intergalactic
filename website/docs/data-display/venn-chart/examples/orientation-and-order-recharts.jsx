import React, { useState } from 'react';
import Button from '@semcore/button';
import { VennChart, VennArea, Tooltip, ResponsiveContainer, getColor } from '@semcore/chart';

const data = [
  { sets: ['I'], name: 'First set', size: 12 },
  { sets: ['T'], name: 'Second set', size: 23 },
  { sets: ['I', 'T'], size: 4 },
];

const orientations = {
  default: (val1, val2) => val2.radius - val1.radius,
  custom: (val1, val2) => val1.radius - val2.radius,
};

const Demo = () => {
  const [orientation, changeOrientation] = useState(Math.PI / 2);
  const [order, changeOrder] = useState('default');
  const handleOrientationChange = () => {
    changeOrientation(orientation === Math.PI / 2 ? Math.PI : Math.PI / 2);
  };
  const handleOrderChange = () => {
    changeOrder(order === 'default' ? 'custom' : 'default');
  };
  return (
    <div>
      <ResponsiveContainer height={200}>
        <VennChart data={data} orientation={orientation} orientationOrder={orientations[order]}>
          <VennArea name="First set" fill={getColor('First set')} />
          <VennArea name="Second set" fill={getColor('Second set')} />
          <Tooltip />
        </VennChart>
      </ResponsiveContainer>
      <Button onClick={handleOrientationChange} mr={2}>
        Change orientation
      </Button>
      <Button onClick={handleOrderChange}>Change order</Button>
    </div>
  );
};

export default Demo;
