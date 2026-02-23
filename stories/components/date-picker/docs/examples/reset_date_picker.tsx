import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import type { DateConstructorParams } from '@semcore/ui/date-picker';
import { DatePicker } from '@semcore/ui/date-picker';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState<DateConstructorParams>(new Date('06/29/2020'));

  return (
    <Flex direction='column' gap={2} alignItems='start'>
      <Text tag='label' size={200} htmlFor='date-picker-reset'>
        Date picker with reset
      </Text>
      <Flex gap={2}>
        <DatePicker value={value} onChange={(date: any) => setValue(date)}>
          <DatePicker.Trigger id='date-picker-reset' />
          <DatePicker.Popper />
        </DatePicker>
        <Button onClick={() => setValue('')}>Reset date</Button>
      </Flex>
    </Flex>
  );
};

export default Demo;
