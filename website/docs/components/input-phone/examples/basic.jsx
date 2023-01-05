import React, { useState } from 'react';
import Input from '@semcore/ui/input';
import CloseXS from '@semcore/ui/icon/Close/m';

const Demo = () => {
  const [value, updateValue] = useState('+');
  return (
    <Input w={180}>
      <Input.Value value={value} onChange={(v) => updateValue(v)} />
      {value.length > 1 && (
        <Input.Addon
          tag={CloseXS}
          interactive
          aria-label="Clear field"
          onClick={() => updateValue('+')}
        />
      )}
    </Input>
  );
};

export default Demo;
