import React from 'react';
import Input from 'intergalactic/input';
import Select from 'intergalactic/select';
import Button from 'intergalactic/button';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <Flex role='group' aria-label='input with select and button'>
      <Input neighborLocation='right' w={200}>
        <Input.Value placeholder='Placeholder' aria-label={'input example'} />
      </Input>
      <Select
        aria-label='select example'
        neighborLocation='both'
        options={[
          { value: 'Option 1', children: 'Option 1' },
          { value: 'Option 2', children: 'Option 2' },
        ]}
      />
      <Button neighborLocation='left' use='primary'>
        Button
      </Button>
    </Flex>
  );
};

export default Demo;
