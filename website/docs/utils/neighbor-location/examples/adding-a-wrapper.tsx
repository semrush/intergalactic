import React from 'react';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';

const Demo = () => {
  return (
    <>
      <NeighborLocation tag={Flex} mb={4}>
        <Button use='primary'>Left</Button>
        <Button use='primary'>Center</Button>
        <Button use='primary'>Right</Button>
      </NeighborLocation>
      <NeighborLocation tag={Flex}>
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </NeighborLocation>
    </>
  );
};

export default Demo;
