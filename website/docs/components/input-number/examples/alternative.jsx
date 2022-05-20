import React, { useRef, useState } from 'react';
import NeighborLocation from '@semcore/neighbor-location';
import InputNumber from '@semcore/input-number';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';

function Demo() {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  function handlerControls(direction) {
    return () => {
      direction > 0 ? inputRef.current.stepUp() : inputRef.current.stepDown();
      setValue(inputRef.current.value);
    };
  }

  return (
    <Flex w={100}>
      <NeighborLocation>
        <Button onClick={handlerControls(-1)}>-</Button>
        <InputNumber>
          <InputNumber.Value
            placeholder="0"
            ref={inputRef}
            step={10}
            value={value}
            onChange={setValue}
          />
        </InputNumber>
        <Button onClick={handlerControls(1)}>+</Button>
      </NeighborLocation>
    </Flex>
  );
}

export default Demo;
