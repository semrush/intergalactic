import React from 'react';
import Button from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';
import NeighborLocation from '@semcore/ui/neighbor-location';

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
