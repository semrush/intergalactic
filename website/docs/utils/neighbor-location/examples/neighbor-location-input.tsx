//https://github.com/semrush/intergalactic/tree/master/website/docs/utils/neighbor-location/examples/neighbor-location-input.tsx
import React from 'react';
import Input from '@semcore/ui/input';
import Button from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <>
      <Flex mb={4}>
        <Input neighborLocation='right' w={200}>
          <Input.Value placeholder='Placeholder' />
        </Input>
        <Button neighborLocation='left'>Button</Button>
      </Flex>
      <Flex mb={4}>
        <Input neighborLocation='right' w={200}>
          <Input.Value placeholder='Placeholder' />
        </Input>
        <Button neighborLocation='left' use='primary'>
          Button
        </Button>
      </Flex>
      <Flex>
        <Input neighborLocation='right' w={200}>
          <Input.Value placeholder='Placeholder' />
        </Input>
        <Button neighborLocation='left' use='primary' theme='success'>
          Button
        </Button>
      </Flex>
    </>
  );
};

export default Demo;
