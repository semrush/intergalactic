import React from 'react';
import Button from '@semcore/button';
import { colors, Plot, Venn } from '@semcore/d3-chart';
import { Flex } from '@semcore/flex-box';

const orders = [
  (val1, val2) => val2.radius - val1.radius,
  (val1, val2) => val1.radius - val2.radius,
];

const orientations = [Math.PI / 2, Math.PI];

const Demo = () => {
  const [orientation, setOrientation] = React.useState(0);
  const [order, setOrder] = React.useState(0);

  return (
    <Flex alignItems='flex-start' direction='column'>
      <Plot height={300} width={400} data={data}>
        <Venn orientation={orientations[orientation]} orientationOrder={orders[order]}>
          <Venn.Circle dataKey='F' name='F' />
          <Venn.Circle dataKey='S' name='S' />
          <Venn.Intersection dataKey='F/S' name='F/S' />
        </Venn>
      </Plot>
      <Flex direction='row'>
        <Button onClick={() => setOrientation(Number(!orientation))} mr={2}>
          Switch orientation
        </Button>
        <Button onClick={() => setOrder(Number(!order))}>Switch order</Button>
      </Flex>
    </Flex>
  );
};

const data = {
  F: 5,
  S: 7,
  'F/S': 3,
};

export default Demo;
