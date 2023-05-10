import React, { useRef, useState } from 'react';
import NeighborLocation from '@semcore/ui/neighbor-location';
import InputNumber from '@semcore/ui/input-number';
import Button from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';

const Demo = () => {
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
        <Button onClick={handlerControls(-1)} aria-label="Decrease">
          -
        </Button>
        <InputNumber>
          <InputNumber.Value
            placeholder="0"
            ref={inputRef}
            step={10}
            value={value}
            onChange={setValue}
          />
        </InputNumber>
        <Button onClick={handlerControls(1)} aria-label="Increase">
          +
        </Button>
      </NeighborLocation>
    </Flex>
  );
};

export default Demo;
