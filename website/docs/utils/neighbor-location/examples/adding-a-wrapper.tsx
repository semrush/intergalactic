import { Flex, NeighborLocation } from '@semcore/base-components';
import Button from '@semcore/button';
import React from 'react';

const Demo = () => {
  return (
    <>
      <NeighborLocation tag={Flex} mb={4} role='group' aria-label='wrapped primary buttons'>
        <Button use='primary'>First</Button>
        <Button use='primary'>Middle</Button>
        <Button use='primary'>Last</Button>
      </NeighborLocation>
      <NeighborLocation tag={Flex} role='group' aria-label='wrapped secondary buttons'>
        <Button>First</Button>
        <Button>Middle</Button>
        <Button>Last</Button>
      </NeighborLocation>
    </>
  );
};

export default Demo;
