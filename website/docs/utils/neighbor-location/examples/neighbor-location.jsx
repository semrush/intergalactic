import React from 'react';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';

const Demo = () => {
  return (
    <>
      <Flex>
        <Button neighborLocation="right">left</Button>
        <Button neighborLocation="both">center</Button>
        <Button neighborLocation="left">right</Button>
      </Flex>
      <hr />
      {/* NeighborLocation is DEPRECATED */}
      <NeighborLocation>
        <Button>left</Button>
        <Button>center</Button>
        <Button>right</Button>
      </NeighborLocation>
    </>
  );
};

export default Demo;
