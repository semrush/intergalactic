import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import InputNumber from '@semcore/ui/input-number';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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
      <Flex w={120} mt={2}>
        <Button onClick={decrement} title='Decrease by 10' neighborLocation='right'>
          -
        </Button>
        <InputNumber neighborLocation='both'>
          <InputNumber.Value
            placeholder='0'
            ref={inputRef}
            step={10}
            value={value}
            onChange={setValue}
            id='alternative-example'
            style={{ borderLeft: '1px solid var(--intergalactic-border-primary)', marginLeft: '-1px' }}
          />
        </InputNumber>
        <Button onClick={increment} title='Increase by 10' neighborLocation='left'>
          +
        </Button>
      </Flex>
    </>
  );
};

export default Demo;
