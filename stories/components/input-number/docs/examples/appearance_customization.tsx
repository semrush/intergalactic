import React from 'react';
import NeighborLocation from 'intergalactic/neighbor-location';
import InputNumber from 'intergalactic/input-number';
import Button from 'intergalactic/button';
import { Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';

const Demo = () => {
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const decrement = React.useCallback(() => {
    inputRef.current?.stepDown();
  }, []);
  const increment = React.useCallback(() => {
    inputRef.current?.stepUp();
  }, []);

  return (
    <>
      <Text tag='label' htmlFor='alternative-example' size={200}>
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
