import React from 'react';
import Button from '@semcore/button';
import NeighborLocation from '@semcore/neighbor-location';

const Demo = () => {
  return (
    <NeighborLocation>
      <Button>left</Button>
      <Button>center</Button>
      <Button>right</Button>
    </NeighborLocation>
  );
};

export default Demo;
