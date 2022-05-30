import React, { useState } from 'react';
import Input from '@semcore/input';
import ActionReturnXS from '@semcore/icon/Return/m';

const Demo = () => {
  const [focus, setFocus] = useState(false);

  return (
    <Input w={240}>
      <Input.Value
        placeholder="Focus right here, buddy"
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
      />
      {focus && (
        <Input.Addon>
          <ActionReturnXS interactive />
        </Input.Addon>
      )}
    </Input>
  );
};

export default Demo;
