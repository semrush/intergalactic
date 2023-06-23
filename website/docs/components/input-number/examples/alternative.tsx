import React, { useRef, useState } from 'react';
import NeighborLocation from '@semcore/ui/neighbor-location';
import InputNumber from '@semcore/ui/input-number';
import Button from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const decrement = React.useCallback(() => {
    inputRef.current.stepDown();
    setValue(inputRef.current.value);
  }, []);
  const increment = React.useCallback(() => {
    inputRef.current.stepUp();
    setValue(inputRef.current.value);
  }, []);

  return (
    <>
      <Text tag='label' htmlFor='alternative-example' size='200'>
        Members count
      </Text>
      <Flex w={100} mt={2}>
        <NeighborLocation>
          <Button onClick={decrement} aria-label='Decrease members count by 10'>
            -
          </Button>
          <InputNumber>
            <InputNumber.Value
              placeholder='0'
              ref={inputRef}
              step={10}
              value={value}
              onChange={setValue}
              id='alternative-example'
            />
          </InputNumber>
          <Button onClick={increment} aria-label='Increase members count by 10'>
            +
          </Button>
        </NeighborLocation>
      </Flex>
    </>
  );
};

export default Demo;
