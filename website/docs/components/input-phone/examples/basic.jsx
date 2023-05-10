import React, { useState } from 'react';
import Input from '@semcore/ui/input';
import CloseXS from '@semcore/ui/icon/Close/m';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  const [value, setValue] = useState('+');
  return (
    <>
      <Text tag="label" htmlFor="basic-example" size="200" mr={2}>
        Phone
      </Text>
      <Input w={180}>
        <Input.Value id="basic-example" value={value} onChange={(v) => setValue(v)} />
        {value.length > 1 && (
          <Input.Addon
            tag={CloseXS}
            interactive
            aria-label="Clear field"
            onClick={() => setValue('+')}
          />
        )}
      </Input>
    </>
  );
};

export default Demo;
