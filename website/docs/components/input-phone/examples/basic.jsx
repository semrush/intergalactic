import React, { useState } from 'react';
import Input from '@semcore/input';
import CloseXS from '@semcore/icon/Close/m';

const Demo = () => {
  const [value, updateValue] = useState('+');
  return (
    <Input w={180}>
      <Input.Value value={value} onChange={(v) => updateValue(v)} />
      {value.length > 1 && (
        <Input.Addon tag={CloseXS} interactive onClick={() => updateValue('+')} />
      )}
    </Input>
  );
};

export default Demo;
