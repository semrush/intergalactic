import React, { useState } from 'react';
import { DateRangePicker } from '@semcore/date-picker';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
  const [value, setValue] = useState<[Date, Date] | undefined>([
    new Date(2023, 3, 10), 
    new Date(2023, 3, 20), 
  ]);
  const [preselectedValue, setPreselectedValue] = useState<[Date, Date] | undefined>([
    new Date(2023, 3, 12),
    new Date(2023, 3, 18),
  ]);
  const [highlighted, setHighlighted] = useState<[Date, Date] | undefined>([
    new Date(2023, 3, 14),
    new Date(2023, 3, 16),
  ]);
  const [displayedPeriod, setDisplayedPeriod] = useState<Date | undefined>(new Date(2023, 3, 1));

  return (
    <Flex gap={5} flexWrap>
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='normal-periods'>
          Normal periods
        </Text>
        <DateRangePicker
          value={value}
          onChange={(newValue) => setValue(newValue as [Date, Date])}
          preselectedValue={preselectedValue}
          onPreselectedValueChange={(newValue) => setPreselectedValue(newValue as [Date, Date])}
          defaultValue={[new Date(2023, 3, 5), new Date(2023, 3, 10)]} 
          defaultDisplayedPeriod={new Date(2023, 3, 1)}
          defaultHighlighted={[new Date(2023, 3, 7), new Date(2023, 3, 8)]}
          highlighted={highlighted}
          onHighlightedChange={(newValue) => setHighlighted(newValue as [Date, Date])}
          displayedPeriod={displayedPeriod}
          onDisplayedPeriodChange={(newDate) => setDisplayedPeriod(newDate)}
          unclearable
        >
          <DateRangePicker.Trigger mt={2} id='normal-periods' />
          <DateRangePicker.Popper />
        </DateRangePicker>
      </Flex>
    </Flex>
  );
};

export default Demo;
