import React, { useState } from 'react';
import Input from '@semcore/ui/input';
import ActionReturnXS from '@semcore/ui/icon/Return/m';

const Demo = () => {
  const [focus, setFocus] = useState(false);

  return (
    <Input w={240}>
      <Input.Value
        placeholder="Focus right here, buddy"
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
      />
      {focus && <Input.Addon interactive tag={ActionReturnXS} aria-label="Submit field value" />}
    </Input>
  );
};

export default Demo;
