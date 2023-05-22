import React from 'react';
import InputNumber from '@semcore/ui/input-number';
import NeighborLocation from '@semcore/ui/neighbor-location';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

const min = 1;
const max = 8;
const Demo = () => {
  const [from, setFrom] = React.useState(undefined);
  const [to, setTo] = React.useState(undefined);
  const handleBlur = React.useCallback(() => {
    if (from > to) {
      setFrom(to);
      setTo(from);
    }
  }, [from, to]);

  return (
    <>
      <Text tag="p" size="200">
        <Text tag="label" htmlFor="basic-example-from">
          From
        </Text>
        /
        <Text tag="label" htmlFor="basic-example-to">
          To
        </Text>
      </Text>
      <Flex w="20%" mt={2}>
        <NeighborLocation>
          <InputNumber>
            <InputNumber.Value
              min={min}
              max={max}
              value={from}
              onChange={setFrom}
              onBlur={handleBlur}
              placeholder={min}
              id="basic-example-from"
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
              placeholder={max}
              id="basic-example-to"
            />
            <InputNumber.Controls />
          </InputNumber>
        </NeighborLocation>
      </Flex>
    </>
  );
};

export default Demo;
