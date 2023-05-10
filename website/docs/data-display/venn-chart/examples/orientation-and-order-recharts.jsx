import React, { useState } from 'react';
import Button from '@semcore/ui/button';
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
  const [orientation, setOrientation] = useState(Math.PI / 2);
  const [order, setOrder] = useState('default');
  const handleOrientationChange = () =>
    setOrientation(orientation === Math.PI / 2 ? Math.PI : Math.PI / 2);
  const handleOrderChange = () => setOrder(order === 'default' ? 'custom' : 'default');
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
