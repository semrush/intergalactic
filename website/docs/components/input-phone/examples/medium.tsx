import React, { useState } from 'react';
import Input from '@semcore/ui/input';
import Flag from '@semcore/ui/flags';
import CloseM from '@semcore/ui/icon/Close/m';

const Demo = () => {
  const [value, setValue] = useState('+1');
  return (
    <Input w={180}>
      <Input.Addon>
        <Flag iso2="US" />
      </Input.Addon>
      <Input.Value value={value} onChange={(v) => setValue(v)} />
      {value > 2 && (
        <Input.Addon
          tag={CloseM}
          interactive
          aria-label="Clear field"
          onClick={() => setValue('+1')}
        />
      )}
    </Input>
  );
};

export default Demo;
