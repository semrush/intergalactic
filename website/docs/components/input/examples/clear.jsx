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
        <Input.Addon
          tag={CloseXS}
          interactive
          aria-label="Clear field"
          onClick={() => setValue('')}
        />
      )}
    </Input>
  );
};

export default Demo;
