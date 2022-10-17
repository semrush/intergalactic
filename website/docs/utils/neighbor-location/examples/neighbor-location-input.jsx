//https://github.com/semrush/intergalactic/tree/master/website/docs/utils/neighbor-location/examples/neighbor-location-input.jsx
import React from 'react';
import Input from '@semcore/input';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  return (
    <>
      <Flex mb={4}>
        <Input neighborLocation="right" w={200}>
          <Input.Value placeholder="Placeholder" />
        </Input>
        <Button neighborLocation="right">Button</Button>
      </Flex>
      <Flex mb={4}>
        <Input neighborLocation="right" w={200}>
          <Input.Value placeholder="Placeholder" />
        </Input>
        <Button neighborLocation="left" use="primary">
          Button
        </Button>
      </Flex>
      <Flex>
        <Input neighborLocation="right" w={200}>
          <Input.Value placeholder="Placeholder" />
        </Input>
        <Button neighborLocation="left" use="primary" theme="success">
          Button
        </Button>
      </Flex>
    </>
  );
};

export default Demo;
