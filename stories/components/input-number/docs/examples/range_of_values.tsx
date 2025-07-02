import { Flex } from '@semcore/base-components';
import InputNumber from '@semcore/input-number';
import { Text } from '@semcore/typography';
import React from 'react';

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
        <InputNumber neighborLocation='right'>
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
        <InputNumber neighborLocation='left'>
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
      </Flex>
    </>
  );
};

export default Demo;
