import { Flex } from '@semcore/ui/base-components';
import Input from '@semcore/ui/input';
import Select from '@semcore/ui/select';
import React from 'react';

const Demo = () => {
  return (
    <Flex role='group' aria-label='input with select'>
      <Input neighborLocation='right' w={200}>
        <Input.Value placeholder='Placeholder' aria-label='input example' />
      </Input>
      <Select
        aria-label='select example'
        neighborLocation='left'
        options={[
          { value: 'Option 1', children: 'Option 1' },
          { value: 'Option 2', children: 'Option 2' },
        ]}
      />
    </Flex>
  );
};

export default Demo;
