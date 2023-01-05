import React from 'react';
import Input from '@semcore/ui/input';
import Select from '@semcore/ui/select';
import { Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <Flex>
      <Input neighborLocation="right" w={200}>
        <Input.Value placeholder="Placeholder" />
      </Input>
      <Select
        neighborLocation="left"
        options={[
          { value: 'Option 1', children: 'Option 1' },
          { value: 'Option 2', children: 'Option 2' },
        ]}
      />
    </Flex>
  );
};

export default Demo;
