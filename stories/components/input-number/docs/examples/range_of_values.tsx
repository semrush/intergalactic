import React from 'react';
import InputNumber from '@semcore/input-number';
import NeighborLocation from '@semcore/neighbor-location';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const min = 1;
const max = 8;
const Demo = () => {
  const [from, setFrom] = React.useState<string>('');
  const [to, setTo] = React.useState<string>('');
  const handleBlur = React.useCallback(() => {
    if (from > to) {
      setFrom(to);
      setTo(from);
    }
  }, [from, to]);

  return (
    <>
      <Text tag='p' size={200}>
        <Text tag='label' htmlFor='basic-example-from'>
          From
        </Text>
        /
        <Text tag='label' htmlFor='basic-example-to'>
          To
        </Text>
      </Text>
      <Flex w='20%' mt={2}>
        <NeighborLocation>
          <InputNumber>
            <InputNumber.Value
              min={min}
              max={max}
              value={from}
              onChange={setFrom}
              onBlur={handleBlur}
              placeholder={min.toString()}
              id='basic-example-from'
            />
            <InputNumber.Controls />
          </InputNumber>
          <InputNumber>
            <InputNumber.Value
              min={min}
              max={max}
              value={to}
              onChange={setTo}
              onBlur={handleBlur}
              placeholder={max.toString()}
              id='basic-example-to'
            />
            <InputNumber.Controls />
          </InputNumber>
        </NeighborLocation>
      </Flex>
    </>
  );
};

export default Demo;