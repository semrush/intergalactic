import React, { useState } from 'react';
import { DateRangePicker } from '@semcore/date-picker';

function getWeek(date) {
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

  return (
    <DateRangePicker
      visible={visible}
      onVisibleChange={(visible) => setVisible(visible)}
      value={value}
      highlighted={highlighted}
    >
      <DateRangePicker.Trigger />
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
                  setHighlighted(getWeek(data.date));
                }}
                onClick={() => {
                  setValue(getWeek(data.date));
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
