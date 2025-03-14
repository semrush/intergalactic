import React from 'react';
import { DateRangePicker } from '@semcore/date-picker';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

function dateToClosestWeek(date: Date): [Date, Date] {
  const startWeek = new Date(date);
  const endWeek = new Date(date);

  startWeek.setDate(startWeek.getDate() + 1 - (startWeek.getDay() || 7));
  endWeek.setDate(endWeek.getDate() + 7 - (endWeek.getDay() || 7));
  return [startWeek, endWeek];
}

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState<Date[]>([]);
  const [highlighted, setHighlighted] = React.useState<Date[]>([]);
  const [preselected, setPreselected] = React.useState<Date[]>([]);
  const handleHighlightedChange = React.useCallback((highlighted: Date[]) => {
    if (highlighted.length === 0) {
      setHighlighted([]);
      setPreselected([]);
      return;
    }
    const week = dateToClosestWeek(highlighted[0]);
    setHighlighted(week);
    setPreselected(week);
  }, []);
  const handleChange = React.useCallback((value: Date[]) => {
    if (value.length === 0) {
      setValue([]);
      setHighlighted([]);
      setPreselected([]);
      return;
    }
    const week = dateToClosestWeek(value[0]);
    setValue(week);
    setHighlighted(week);
    setPreselected(week);
    setVisible(false);
  }, []);

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='week-picker'>
        Week picker
      </Text>
      <DateRangePicker
        visible={visible}
        onVisibleChange={setVisible}
        value={value}
        onChange={handleChange}
        highlighted={highlighted}
        preselectedValue={preselected}
        onPreselectedValueChange={handleChange}
        onHighlightedChange={handleHighlightedChange}
      >
        <DateRangePicker.Trigger mt={2}>
          <DateRangePicker.Trigger.DateRange>
            <DateRangePicker.Trigger.DateRange.Indicator />
            <DateRangePicker.Trigger.DateRange.FromMaskedInput id='week-picker' />
            <DateRangePicker.Trigger.DateRange.RangeSep />
            <DateRangePicker.Trigger.DateRange.ToMaskedInput disabled />
          </DateRangePicker.Trigger.DateRange>
        </DateRangePicker.Trigger>
        <DateRangePicker.Popper>
          <DateRangePicker.Header />
          <DateRangePicker.Calendar renderOutdated />
        </DateRangePicker.Popper>
      </DateRangePicker>
    </Flex>
  );
};

export default Demo;
