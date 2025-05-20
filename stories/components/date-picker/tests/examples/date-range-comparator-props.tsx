import React, { useState } from 'react';
import { DateRangeComparator } from '@semcore/date-picker';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
  const [value, setValue] = useState<{ value?: [Date, Date]; compare?: [Date, Date] }>({
    value: [new Date(2024, 3, 10), new Date(2024, 3, 20)],
    compare: [new Date(2024, 3, 18), new Date(2024, 4, 5)],
  });
  const [displayedPeriod, setDisplayedPeriod] = useState<Date>(new Date(2024, 3, 1)); // Апрель 2024
  const [highlighted, setHighlighted] = useState<Date[]>([]);
  const [compareHighlighted, setCompareHighlighted] = useState<Date[]>([]);
  const [preselectedValue, setPreselectedValue] = useState<Date[]>([]);
  const [preselectedCompare, setPreselectedCompare] = useState<Date[]>([]);
  const [compareToggle, setCompareToggle] = useState<boolean>(true);
  const [focusedRange, setFocusedRange] = useState<'value' | 'compare'>('value');

  const periods = [
    { value: [new Date(2024, 3, 1), new Date(2024, 3, 7)], children: 'This week' },
    { value: [new Date(2024, 2, 1), new Date(2024, 2, 31)], children: 'Last month' },
  ];

  const handleTriggerClick = () => {
    setDisplayedPeriod(new Date(2024, 2, 1));
  };

  return (
    <Flex gap={5} flexWrap>
      <Flex direction="column">
        <Text tag="label" size={200} htmlFor="date-range-comparator">
          Date Range Comparator
        </Text>
        <DateRangeComparator
          value={value}
          onChange={(newValue) => {
            setValue({
              value: newValue.value as [Date, Date] | undefined,
              compare: newValue.compare as [Date, Date] | undefined,
            });
          }}
          defaultValue={{
            value: [new Date(2024, 3, 5), new Date(2024, 3, 10)],
            compare: [new Date(2024, 2, 5), new Date(2024, 2, 10)],
          }}
          defaultDisplayedPeriod={new Date(2024, 3, 1)} 
          displayedPeriod={displayedPeriod}
          onDisplayedPeriodChange={(date) => {
            setDisplayedPeriod(date);
          }}
          defaultHighlighted={[new Date(2024, 3, 7), new Date(2024, 3, 8)]}
          highlighted={highlighted}
          onHighlightedChange={setHighlighted}
          compareHighlighted={compareHighlighted}
          onCompareHighlightedChange={setCompareHighlighted}
          preselectedValue={preselectedValue}
          onPreselectedValueChange={setPreselectedValue}
          preselectedCompare={preselectedCompare}
          onPreselectedCompareChange={setPreselectedCompare}
          compareToggle={compareToggle}
          onCompareToggleChange={setCompareToggle}
          focusedRange={focusedRange}
          onFocusedRangeChange={setFocusedRange}
          unclearable
        //   disabled={[new Date(2024, 3, 15)]}
         //disabledErrorText="This date is disabled"
          periods={periods}
        >
          <DateRangeComparator.Trigger mt={2} id="date-range-comparator" onClick={handleTriggerClick} />
          <DateRangeComparator.Popper />
        </DateRangeComparator>
      </Flex>
    </Flex>
  );
};

export default Demo;
