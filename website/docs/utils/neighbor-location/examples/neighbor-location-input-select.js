import React from 'react';
import Input from '@semcore/input';
import Select from '@semcore/select';
import NeighborLocation from '@semcore/neighbor-location';

const Demo = () => {
  return (
    <NeighborLocation>
      <Input w={200}>
        <Input.Value placeholder="Placeholder" />
      </Input>
      <Select
        options={[
          { value: 'Option 1', children: 'Option 1' },
          { value: 'Option 2', children: 'Option 2' },
        ]}
      />
    </NeighborLocation>
  );
};

export default Demo;
