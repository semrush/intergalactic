import React from 'react';
import { DateRangePicker } from '@semcore/ui/date-picker';

function dateToClosestWeek(date) {
  const startWeek = new Date(date);
  const endWeek = new Date(date);

  startWeek.setDate(startWeek.getDate() + 1 - (startWeek.getDay() || 7));
  endWeek.setDate(endWeek.getDate() + 7 - (endWeek.getDay() || 7));
  return [startWeek, endWeek];
}

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [highlighted, setHighlighted] = React.useState([]);

  React.useEffect(() => {
    if (!value[0]) return;
    const week = dateToClosestWeek(value[0]);
    if (!value[1] || week[0].getTime() !== value[0].getTime()) {
      setValue(week);
    }
  }, [value[0]?.getTime()]);

  return (
    <DateRangePicker
      visible={visible}
      onVisibleChange={(visible) => setVisible(visible)}
      value={value}
      onChange={setValue}
      highlighted={highlighted}
    >
      <DateRangePicker.Trigger>
        <DateRangePicker.Trigger.DateRange>
          <DateRangePicker.Trigger.DateRange.Indicator />
          <DateRangePicker.Trigger.DateRange.FromMaskedInput />
          <DateRangePicker.Trigger.DateRange.RangeSep />
          <DateRangePicker.Trigger.DateRange.ToMaskedInput disabled />
        </DateRangePicker.Trigger.DateRange>
      </DateRangePicker.Trigger>
      <DateRangePicker.Popper>
        <DateRangePicker.Header />
        <DateRangePicker.Calendar
          renderOutdated
          onHighlightedChange={(date) => {
            if (date.length === 1) setHighlighted([]);
          }}
        >
          {({ days }) =>
            days.map((data, i) => (
              <DateRangePicker.Calendar.Unit
                {...data}
                key={i}
                onMouseEnter={() => {
                  setHighlighted(dateToClosestWeek(data.date));
                }}
                onClick={() => {
                  setValue(dateToClosestWeek(data.date));
                  setVisible(false);
                  return false;
                }}
              />
            ))
          }
        </DateRangePicker.Calendar>
      </DateRangePicker.Popper>
    </DateRangePicker>
  );
};

export default Demo;
