import React from 'react';
import { DatePicker, DateRangePicker } from '@semcore/date-picker';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
  // Состояние для фиксированного значения даты "Today"
  const today = new Date('2020-06-29'); // Замокированная дата для "Today"
  
  // Состояние для фиксированного диапазона дат "Last 2 months"
  const lastTwoMonthsStart = new Date('2020-04-01');  // Начало "Last 2 months"
  const lastTwoMonthsEnd = new Date('2020-06-01');    // Конец "Last 2 months"
  const fixedRange = [lastTwoMonthsStart, lastTwoMonthsEnd]; // Диапазон

  // Состояния для выбранных дат
  const [value, setValue] = React.useState(today); // Сегодняшняя фиксированная дата
  const [valueRange, setValueRange] = React.useState(fixedRange); // Диапазон последних 2 месяцев

  return (
    <Flex gap={5} flexWrap>
      <Flex direction="column">
        <Text tag="label" size={200} htmlFor="simple-date-picker">
          Simple date picker (Today)
        </Text>
        <DatePicker value={value} onChange={(date: any) => setValue(date)}>
          <DatePicker.Trigger mt={2} id="simple-date-picker" />
          <DatePicker.Popper />
        </DatePicker>
      </Flex>
      <Flex direction="column">
        <Text tag="label" size={200} htmlFor="simple-date-range-picker">
          Date range picker (Last 2 months)
        </Text>
        <DateRangePicker value={valueRange} onChange={(date: any) => setValueRange(date)}>
          <DateRangePicker.Trigger mt={2} id="simple-date-range-picker" />
          <DateRangePicker.Popper />
        </DateRangePicker>
      </Flex>
    </Flex>
  );
};

export default Demo;
