import React from 'react';
import Input from 'intergalactic/input';
import Button from 'intergalactic/button';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <>
      <Flex mb={4}>
        <Input neighborLocation='right' w={200}>
          <Input.Value
            placeholder='Placeholder'
            aria-label={'Label for input with default button'}
          />
        </Input>
        <Button neighborLocation='left'>Button</Button>
      </Flex>
      <Flex mb={4}>
        <Input neighborLocation='right' w={200}>
          <Input.Value
            placeholder='Placeholder'
            aria-label={'Label for input with primary button'}
          />
        </Input>
        <Button neighborLocation='left' use='primary'>
          Button
        </Button>
      </Flex>
      <Flex>
        <Input neighborLocation='right' w={200}>
          <Input.Value
            placeholder='Placeholder'
            aria-label={'Label for input with success button'}
          />
        </Input>
        <Button neighborLocation='left' use='primary' theme='success'>
          Button
        </Button>
      </Flex>
    </>
  );
};

export default Demo;
