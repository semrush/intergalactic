import React, { useState } from 'react';
import Input from '@semcore/input';
import Flag from '@semcore/flags';
import CloseXS from '@semcore/icon/Close/m';

const Demo = () => {
  const [value, updateValue] = useState('+1');
  return (
    <Input w={180}>
      <Input.Addon>
        <Flag iso2="US" />
      </Input.Addon>
      <Input.Value value={value} onChange={(v) => updateValue(v)} />
      {value > 2 && (
        <Input.Addon>
          <CloseXS interactive onClick={() => updateValue('+1')} />
        </Input.Addon>
      )}
    </Input>
  );
};

export default Demo;
