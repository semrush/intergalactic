---
title: Example
fileSource: date-picker
tabs: Design('date-picker'), A11y('date-a11y'), API('date-api'), Example('date-code'), Changelog('date-changelog')
---

## DatePicker

These are widgets for selecting dates and date ranges. The `DatePicker` component returns a JavaScript `Date` object via the `onChange` function, while the `DateRangePicker` returns a JavaScript `Date` array.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import { DatePicker, DateRangePicker } from '@semcore/ui/date-picker';
import { Box, Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, setValue] = useState(new Date('06/29/2020'));
  const [valueRange, setValueRange] = useState([]);

  return (
    <Flex>
      <Box>
        <DatePicker value={value} onChange={(date) => setValue(date)}>
          <DatePicker.Trigger />
          <DatePicker.Popper />
        </DatePicker>
      </Box>
      <Box ml={5}>
        <DateRangePicker value={valueRange} onChange={(date) => setValueRange(date)}>
          <DateRangePicker.Trigger />
          <DateRangePicker.Popper />
        </DateRangePicker>
      </Box>
    </Flex>
  );
};


</script>

:::

## MonthRangePicker

These are widgets for selecting a single month and a range of months, respectively. The API is similar to that of the `DatePicker` and `DateRangePicker` components.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import { MonthPicker, MonthRangePicker } from '@semcore/ui/date-picker';
import { Box, Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, setValue] = useState(new Date());
  const [valueRange, setValueRange] = useState([]);

  return (
    <Flex>
      <Box>
        <MonthPicker value={value} onChange={(date) => setValue(date)}>
          <MonthPicker.Trigger />
          <MonthPicker.Popper />
        </MonthPicker>
      </Box>
      <Box ml={5}>
        <MonthRangePicker value={valueRange} onChange={(date) => setValueRange(date)}>
          <MonthRangePicker.Trigger />
          <MonthRangePicker.Popper />
        </MonthRangePicker>
      </Box>
    </Flex>
  );
};


</script>

:::

## Trigger and Popper

To access the internal components, you must expand the component. The `Trigger` and `Popper` components are wrapped by `Dropdown.Trigger` and `Dropdown.Popper`, respectively. All the properties and examples available in `Dropdown` also work in `DatePicker`.

::: sandbox

<script lang="tsx">
import React from 'react';
import { DatePicker } from '@semcore/ui/date-picker';

const Demo = () => {
  return (
    <DatePicker>
      <DatePicker.Trigger>
        <DatePicker.Trigger.SingleDateInput>
          <DatePicker.Trigger.SingleDateInput.Indicator />
          <DatePicker.Trigger.SingleDateInput.MaskedInput />
        </DatePicker.Trigger.SingleDateInput>
      </DatePicker.Trigger>
      <DatePicker.Popper />
    </DatePicker>
  );
};


</script>

:::

## Custom header

You can change the header layout by expanding the component further.

::: sandbox

<script lang="tsx">
import React from 'react';
import { DatePicker } from '@semcore/ui/date-picker';

const Demo = () => {
  return (
    <DatePicker>
      <DatePicker.Trigger />
      <DatePicker.Popper>
        <DatePicker.Header>
          <DatePicker.Prev />
          <DatePicker.Title>
            {({ displayedPeriod }) =>
              typeof displayedPeriod === 'string'
                ? displayedPeriod
                : new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    year: 'numeric',
                  }).format(displayedPeriod)
            }
          </DatePicker.Title>
          <DatePicker.Next />
        </DatePicker.Header>
        <DatePicker.Calendar />
      </DatePicker.Popper>
    </DatePicker>
  );
};


</script>

:::

## Custom day

Calendar days can have metrics, and you can change the units by passing a function to the `Calendar` component.

::: sandbox

<script lang="tsx">
import React from 'react';
import { DatePicker } from '@semcore/ui/date-picker';
import ProgressBar from '@semcore/ui/progress-bar';
import { Flex } from '@semcore/ui/flex-box';

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

const Demo = () => {
  return (
    <DatePicker>
      <DatePicker.Trigger />
      <DatePicker.Popper>
        <DatePicker.Header />
        <DatePicker.Calendar>
          {({ days }) =>
            days.map((data, i) => (
              <DatePicker.Calendar.Unit {...data} key={i}>
                <Flex direction='column' p={1} w={'100%'} alignItems='center'>
                  {data.children}
                  <ProgressBar
                    size='s'
                    duration={0}
                    value={randomInteger(0, 100)}
                    theme='dark'
                    mt={1}
                  />
                </Flex>
              </DatePicker.Calendar.Unit>
            ))
          }
        </DatePicker.Calendar>
      </DatePicker.Popper>
    </DatePicker>
  );
};


</script>

:::

## Disabled

You can prevent selection of certain dates or a range of dates using the `disabled` property (and imagine yourself as a superhero 🕺🏻). The property takes an array of dates or an array with two dates to specify a range, or a `crontab` format for selecting dates periodically.

::: sandbox

<script lang="tsx">
import React from 'react';
import { DatePicker } from '@semcore/ui/date-picker';

const Demo = () => {
  const today = new Date();
  return (
    <DatePicker disabled={[new Date(today.getFullYear(), 0, 1), [today, false], '* * 6,7']}>
      <DatePicker.Trigger />
      <DatePicker.Popper />
    </DatePicker>
  );
};


</script>

:::

## Custom date ranges

Date ranges may be customized or switched off at all, by transferring `periods={[]}`.

::: sandbox

<script lang="tsx">
import React from 'react';
import { DateRangePicker } from '@semcore/ui/date-picker';
import { Flex, Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const pastYear = new Date();
  pastYear.setFullYear(pastYear.getFullYear() - 1);
  const past6days = new Date();
  past6days.setDate(past6days.getDate() - 6);
  const past13days = new Date();
  past13days.setDate(past13days.getDate() - 13);

  const periods = [
    { children: 'Last 7 days', value: [past6days, new Date()] },
    { children: 'Last 14 days', value: [past13days, new Date()] },
    { children: 'Last Year', value: [pastYear, new Date()] },
  ];
  return (
    <Flex>
      <Box mr={5} mb={5}>
        <DateRangePicker periods={periods}>
          <DateRangePicker.Trigger />
          <DateRangePicker.Popper />
        </DateRangePicker>
      </Box>
      <Box>
        <DateRangePicker>
          <DateRangePicker.Trigger />
          <DateRangePicker.Popper />
        </DateRangePicker>
      </Box>
    </Flex>
  );
};


</script>

:::

## Week picker

You can manually select a custom period, if needed (for example, a week) by taking all the control in manual mode.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import { DateRangePicker } from '@semcore/ui/date-picker';

function dateToClosestWeek(date) {
  const startWeek = new Date(date);
  const endWeek = new Date(date);

  startWeek.setDate(startWeek.getDate() + 1 - (startWeek.getDay() || 7));
  endWeek.setDate(endWeek.getDate() + 7 - (endWeek.getDay() || 7));
  return [startWeek, endWeek];
}

const Demo = () => {
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


</script>

:::
