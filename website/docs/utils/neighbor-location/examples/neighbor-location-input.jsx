//https://github.com/semrush/intergalactic/tree/master/website/docs/utils/neighbor-location/examples/neighbor-location-input.jsx
import React from 'react';
import Input from '@semcore/input';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';

const Demo = () => {
  return (
    <>
      <NeighborLocation tag={Flex} mb={4}>
        <Input w={200}>
          <Input.Value placeholder="Placeholder" />
        </Input>
        <Button>Button</Button>
      </NeighborLocation>
      <NeighborLocation tag={Flex} mb={4}>
        <Input w={200}>
          <Input.Value placeholder="Placeholder" />
        </Input>
        <Button use="primary">Button</Button>
      </NeighborLocation>
      <NeighborLocation tag={Flex}>
        <Input w={200}>
          <Input.Value placeholder="Placeholder" />
        </Input>
        <Button use="primary" theme="success">
          Button
        </Button>
      </NeighborLocation>
    </>
  );
};

export default Demo;
