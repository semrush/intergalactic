---
title: DatePicker
fileSource: date-picker
tabs: Design('date-picker'), A11y('date-a11y'), API('date-api'), Example('date-code'), Changelog('date-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';

import {
  DatePicker,
  DateRangePicker,
  MonthPicker,
  MonthRangePicker,
} from '@semcore/ui/date-picker';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

const d = new Date();

const TYPES = ['date', 'date-range', 'month', 'month-range'];

const App = PlaygroundGeneration(
  (createGroupWidgets) => {
    const { empty, onChange, select } = createGroupWidgets('Picker');

    const value = empty({
      key: 'value',
      defaultValue: d,
    });

    const valueRange = empty({
      key: 'valueRange',
      defaultValue: [d, d.setDate(d.getDate() + 7)],
    });

    const type = select({
      key: 'type',
      defaultValue: 'date',
      label: 'Type',
      options: TYPES.map((value) => ({
        name: value,
        value,
      })),
    });

    return (
      <>
        {type === 'date' && (
          <DatePicker value={value} onChange={(value) => onChange('value', value)}>
            <DatePicker.Trigger />
            <DatePicker.Popper />
          </DatePicker>
        )}
        {type === 'date-range' && (
          <DateRangePicker value={valueRange} onChange={(value) => onChange('valueRange', value)}>
            <DateRangePicker.Trigger />
            <DateRangePicker.Popper />
          </DateRangePicker>
        )}
        {type === 'month' && (
          <MonthPicker value={value} onChange={(value) => onChange('value', value)}>
            <MonthPicker.Trigger />
            <MonthPicker.Popper />
          </MonthPicker>
        )}
        {type === 'month-range' && (
          <MonthRangePicker value={valueRange} onChange={(value) => onChange('valueRange', value)}>
            <MonthRangePicker.Trigger />
            <MonthRangePicker.Popper />
          </MonthRangePicker>
        )}
      </>
    );
  },
  {
    filterProps: ['onChange', 'value', 'valueRange'],
  },
);
</script>

:::

## Description

**Date picker** is a component used to input or select a specific date or date range. It is available in four types:

- Date picker (for selecting a single day)
- Date range picker (for selecting a range of days/weeks)
- Month picker (for selecting a single month)
- Month range picker (for selecting a range of months)

## Trigger

Trigger is built on the [Input](/components/input/input) component.

::: tip
Use the **en dash** to indicate range of dates. Don’t add a space on either side of the **en dash**.
:::
<!-- > _For example: "Mar 4–10, 2022"._ -->

Table: Date picker trigger's states and cases

| State or case                      | Appearance example                    |
| ---------------------------------- | ------------------------------------- |
| Placeholder                        | ![Trigger with "MM/DD/YYYY" placeholder text inside](static/placeholder.png)    |
| Day                                | ![Trigger with "Mar 14, 2023" date inside](static/date-trigger-1.png) |
| Range of days in one month         | ![Trigger with "Mar 10, 2023-Mar 13, 2023" date range inside](static/date-trigger-2.png) |
| Range of days in one year          | ![Trigger with "Mar 21, 2023-Apr 13, 2023" date range inside](static/date-trigger-3.png) |
| Range of days in different years   | ![Trigger with "Mar 8, 2022-Feb 13, 2023" date range inside](static/date-trigger-4.png) |
| Month                              | ![Trigger with "Sep, 2022" month inside](static/date-trigger-5.png) |
| Range of months in one year        | ![Trigger with "Sep, 2023-Dec, 2023" month range inside](static/date-trigger-6.png) |
| Range of months in different years | ![Trigger with "Sep, 2022-Dec, 2023" month range inside](static/date-trigger-7.png) |

## "Apply" button

"Apply" button allows users to submit their selected date(s). The selected date can be submitted by clicking on the date itself or by clicking the "Apply" button (if available).

"Apply" button is typically added to dropdowns when users need to select a range of dates or when selecting a date affects interface limitations. If necessary, the "Apply" button can be added to any type of date picker.

![](static/daterangepicker-normal.png)

## Date picker

Date picker selects a single day. Once the day is selected, the dropdown closes and the date in the trigger updates.

::: tip
If date has `disabled` state, then nothing should happen after user clicks it.
:::

![](static/timepicker-norma-opened.png)

## Date picker and "Today" button

You can include a "Today" button that selects the current date. Upon clicking the button, the present date is selected, and the calendar automatically scrolls up to the current month (if it wasn't already displayed).

![](static/timepicker-today-style.png)

## Date picker and time picker

You can place [TimePicker](/components/time-picker/time-picker) inside the dropdown.

![](static/datepicker-timepicker-normal.png)

And you can show 12-hour or 24-hour format of time for TimePicker, depending on the selected region (for example, user account settings).

![](static/datepicker-timepicker-12h-24h.png)

## Date picker and progress bar

You can add a small progress bar under the date to show the progress of the metrics you need to show.

![](static/timepicker-metric-normal.png)

## Month picker

selects only one month. Once the month is selected, the dropdown closes, and the value in the trigger updates.

While a calendar with two month blocks can be displayed, it is more commonly used for range selection (see below).

![](static/monthpicker-normal-2sizes.png)

![](static/monthpicker-paddings-row.png)

## Date range picker

Date range picker typically displays two month blocks in the calendar by default. To update the value in the trigger, user must click the "Apply" button after selecting the desired date range.

![](static/daterangepicker-normal.png)

You can add presets for date ranges. Presets and their names may be customized. The selected preset gets `active` status.

![](static/daterangepicker-custom-presets.png)

You also can add the "Reset" button for deselecting the selected values. In this case the trigger changes its value to the placeholder.

![](static/daterangepicker-reset-buttons.png)

## Week picker

Week picker selects a single week and is similar to a regular date range picker, but with only one month block displayed in the dropdown.

![](static/weekpicker.png)

## Month range picker

Month range picker selects a range of several weeks and typically displays two month blocks in the dropdown by default. To update the value in the trigger, user must click the "Apply" button after selecting the desired month range.

![](static/monthrangepicker-normal.png)

You can also add the presets of date ranges for such picker.

![](static/monthrangepicker-presets.png)

