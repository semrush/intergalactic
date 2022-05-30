import React, { useState } from 'react';
import Input from '@semcore/input';
import CloseXS from '@semcore/icon/Close/m';

const Demo = () => {
  const [value, setValue] = useState('');

  return (
    <Input w={240}>
      <Input.Value
        placeholder="Type something to clear something 😏"
        value={value}
        onChange={(v) => setValue(v)}
      />
      {value && (
        <Input.Addon>
          <CloseXS interactive onClick={() => setValue('')} />
        </Input.Addon>
      )}
    </Input>
  );
};

export default Demo;
