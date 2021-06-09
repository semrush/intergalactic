import React, { useState } from 'react';
import Button from '@semcore/button';
import { Plot, Venn, Tooltip } from '@semcore/d3-chart';
import { Flex } from '@semcore/flex-box';

const showTooltip = (sets, data, name) => {
  const intersectionName = [];
  sets?.map((set) => intersectionName.push(data.find((c) => c.sets[0] === set).name));
  return intersectionName.join(' & ') || name;
};

export default () => {
  const [orientation, changeOrientation] = useState(Math.PI / 2);
  const [order, changeOrder] = useState('default');

  const handleOrientationChange = () => {
    changeOrientation(orientation === Math.PI / 2 ? Math.PI : Math.PI / 2);
  };
  const handleOrderChange = () => {
    changeOrder(order === 'default' ? 'custom' : 'default');
  };

  return (
    <Flex alignItems="center" direction="column">
      <Plot height={300} width={400} data={data}>
        <Venn orientation={orientation} orientationOrder={orientations[order]}>
          <Venn.Circle name="First" />
          <Venn.Circle name="Second" color="#50AEF4" />
          <Venn.Intersection sets={['F', 'S']} />
          <Tooltip>
            {({ name, sets }) => {
              return {
                children: (
                  <>
                    <Tooltip.Title>{showTooltip(sets, data, name)}</Tooltip.Title>
                  </>
                ),
              };
            }}
          </Tooltip>
        </Venn>
      </Plot>
      <Flex direction="row">
        <Button onClick={handleOrientationChange} mr={2}>
          Change orientation
        </Button>
        <Button onClick={handleOrderChange}>Change order</Button>
      </Flex>
    </Flex>
  );
};

const data = [
  { name: 'First', sets: ['F'], size: 5 },
  { name: 'Second', sets: ['S'], size: 7 },
  { sets: ['F', 'S'], size: 3 },
];

const orientations = {
  default: (val1, val2) => val2.radius - val1.radius,
  custom: (val1, val2) => val1.radius - val2.radius,
};
