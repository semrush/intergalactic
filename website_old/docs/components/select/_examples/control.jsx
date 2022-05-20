import React, { useState } from 'react';
import Select from '@semcore/select';
import { Flex } from '@semcore/flex-box';

const options = Array(6)
  .fill()
  .map((i, idx) => ({
    value: idx,
    children: `Option ${idx}`,
    label: `Label ${idx}`,
  }));

function Demo() {
  const [value, setValue] = useState(null);
  return (
    <Flex p={10} alignItems="center" justifyContent="center">
      <Select options={options} value={value} onChange={(v) => setValue(v)} />
    </Flex>
  );
}

export default Demo;
