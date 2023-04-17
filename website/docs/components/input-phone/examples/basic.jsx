import React, { useState } from 'react';
import Input from '@semcore/ui/input';
import CloseXS from '@semcore/ui/icon/Close/m';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  const [value, updateValue] = useState('+');
  return (
    <>
      <Text tag='label' htmlFor='basic-example' size='300'>
        Phone
      </Text>
      <Input w={180}>
        <Input.Value id='basic-example' value={value} onChange={(v) => updateValue(v)} />
        {value.length > 1 && (
          <Input.Addon
            tag={CloseXS}
            interactive
            aria-label='Clear field'
            onClick={() => updateValue('+')}
          />
        )}
      </Input>
    </>
  );
};

export default Demo;
