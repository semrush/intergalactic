import React from 'react';
import Button from '@semcore/ui/button';
import Divider from '@semcore/ui/divider';
import { Flex } from '@semcore/ui/flex-box';
import NeighborLocation from '@semcore/ui/neighbor-location';

const Demo = () => {
  return (
    <>
      <Flex>
        <Button neighborLocation='right'>Left</Button>
        <Button neighborLocation='both'>Center</Button>
        <Button neighborLocation='left'>Right</Button>
      </Flex>
      <Divider my={4} />
      {/* NeighborLocation is DEPRECATED */}
      <NeighborLocation>
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </NeighborLocation>
    </>
  );
};

export default Demo;
