import { Flex } from '@semcore/ui/base-components';
import InputNumber from '@semcore/ui/input-number';
import { Text } from '@semcore/ui/typography';
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
    <Flex direction='column' gap={2}>
      <Text tag='p' size={200}>
        <Text tag='label' htmlFor='basic-example-from'>
          From
        </Text>
        /
        <Text tag='label' htmlFor='basic-example-to'>
          To
        </Text>
      </Text>
      <Flex w='20%'>
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
    </Flex>
  );
};

export default Demo;
