import React, { useState } from 'react';
import { DateRangePicker } from '@semcore/date-picker';

function dateToClosestWeek(date) {
  const startWeek = new Date(date);
  const endWeek = new Date(date);

  startWeek.setDate(startWeek.getDate() + 1 - (startWeek.getDay() || 7));
  endWeek.setDate(endWeek.getDate() + 7 - (endWeek.getDay() || 7));
  return [startWeek, endWeek];
}

function Demo() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState([]);
  const [highlighted, setHighlighted] = useState([]);

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
      <DateRangePicker.InputTrigger>
        <DateRangePicker.InputTrigger.DateRange>
          <DateRangePicker.InputTrigger.DateRange.Indicator />
          <DateRangePicker.InputTrigger.DateRange.FromMaskedInput />
          <DateRangePicker.InputTrigger.DateRange.RangeSep />
          <DateRangePicker.InputTrigger.DateRange.ToMaskedInput disabled />
        </DateRangePicker.InputTrigger.DateRange>
      </DateRangePicker.InputTrigger>
      <DateRangePicker.Popper>
        <DateRangePicker.Header />
        <DateRangePicker.Calendar
          renderOutdated
          onHighlighted={(date) => {
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
}

export default Demo;
