import React, { useState } from 'react';
import Button from '@semcore/button';
import { Plot, Venn } from '@semcore/d3-chart';
import { Flex } from '@semcore/flex-box';

const orders = [
  (val1, val2) => val2.radius - val1.radius,
  (val1, val2) => val1.radius - val2.radius,
];

const orientations = [Math.PI / 2, Math.PI];

export default () => {
  const [orientation, changeOrientation] = useState(0);
  const [order, changeOrder] = useState(0);

  return (
    <Flex alignItems="center" direction="column">
      <Plot height={300} width={400} data={data}>
        <Venn orientation={orientations[orientation]} orientationOrder={orders[order]}>
          <Venn.Circle dataKey="F" color="#3AB011" />
          <Venn.Circle dataKey="S" color="#50AEF4" />
          <Venn.Intersection dataKey="F/S" />
        </Venn>
      </Plot>
      <Flex direction="row">
        <Button onClick={() => changeOrientation(Number(!orientation))} mr={2}>
          Change orientation
        </Button>
        <Button onClick={() => changeOrder(Number(!order))}>Change order</Button>
      </Flex>
    </Flex>
  );
};

const data = {
  F: 5,
  S: 7,
  'F/S': 3,
};
