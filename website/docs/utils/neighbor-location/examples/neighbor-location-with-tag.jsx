import React from 'react';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';

const Demo = () => {
  return (
    <>
      <NeighborLocation tag={Flex} mb={4}>
        <Button use="primary">left</Button>
        <Button use="primary">center</Button>
        <Button use="primary">right</Button>
      </NeighborLocation>
      <NeighborLocation tag={Flex}>
        <Button>left</Button>
        <Button>center</Button>
        <Button>right</Button>
      </NeighborLocation>
    </>
  );
};

export default Demo;
