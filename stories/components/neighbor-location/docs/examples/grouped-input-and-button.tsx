import React from 'react';
import Input from '@semcore/input';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  return (
    <>
      <Flex mb={4} role='group' aria-label='Input with secondary button'>
        <Input neighborLocation='right' w={200}>
          <Input.Value placeholder='Placeholder' aria-label={'Input example'} />
        </Input>
        <Button neighborLocation='left'>Button</Button>
      </Flex>
      <Flex mb={4} role='group' aria-label='Input with primary button'>
        <Input neighborLocation='right' w={200}>
          <Input.Value placeholder='Placeholder' aria-label={'input example'} />
        </Input>
        <Button neighborLocation='left' use='primary'>
          Button
        </Button>
      </Flex>
      <Flex role='group' aria-label='Input with primary success button'>
        <Input neighborLocation='right' w={200}>
          <Input.Value placeholder='Placeholder' aria-label={'input example'} />
        </Input>
        <Button neighborLocation='left' use='primary' theme='success'>
          Button
        </Button>
      </Flex>
    </>
  );
};

export default Demo;
