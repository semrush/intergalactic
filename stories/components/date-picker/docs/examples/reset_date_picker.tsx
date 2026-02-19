import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import type { DateConstructorParams } from '@semcore/ui/date-picker';
import { DatePicker } from '@semcore/ui/date-picker';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState<DateConstructorParams>(new Date('06/29/2020'));

  return (
    <Flex gap={5}>
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='simple-date-picker'>
          Simple date picker
        </Text>
        <DatePicker value={value} onChange={(date: any) => setValue(date)}>
          <DatePicker.Trigger mt={2} id='simple-date-picker' />
          <DatePicker.Popper />
        </DatePicker>
      </Flex>
      <Button onClick={() => setValue('')}>Reset date</Button>
    </Flex>
  );
};

export default Demo;
