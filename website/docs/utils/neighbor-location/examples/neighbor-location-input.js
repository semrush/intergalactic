import React from 'react';
import Input from '@semcore/input';
import Button from '@semcore/button';
import NeighborLocation from '@semcore/neighbor-location';

const Demo = () => {
  return (
    <NeighborLocation>
      <Input w={200}>
        <Input.Value placeholder="Placeholder" />
      </Input>
      <Button>Button</Button>
    </NeighborLocation>
  );
};

export default Demo;
