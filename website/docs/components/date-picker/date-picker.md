---
title: DatePicker
fileSource: date-picker
tabs: Design('date-picker'), A11y('date-picker-a11y'), API('date-picker-api'), Example('date-picker-code'), Changelog('date-picker-changelog')
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

**DatePicker** is a component used to input or select a specific date or date range. It's available in four types:

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

## DatePicker

Date picker selects a single day. Once the day is selected, the dropdown closes and the date in the trigger updates.

::: tip
If date has `disabled` state, then nothing should happen after user clicks it.
:::

![](static/datepicker-normal-opened.png)

### Grid margins

![](static/datepicker-margins-row.png)

## DatePicker and "Today" button

You can include a "Today" button that selects the current date. Upon clicking the button, the present date is selected, and the calendar automatically scrolls up to the current month (if it wasn't already displayed).

![](static/datepicker-today-style.png)

## DatePicker with TimePicker

You can place [TimePicker](/components/time-picker/time-picker) inside the dropdown.

![](static/datepicker-timepicker-normal.png)

And you can show 12-hour or 24-hour format of time for TimePicker, depending on the selected region (for example, user account settings).

![](static/datepicker-timepicker-12h-24h.png)

## DatePicker with custom cell elements

You can add custom elements inside cells: for example, a small progressbar under the date to show the progress of the metrics you need to show.

![](static/datepicker-metric-normal.png)

## MonthPicker

selects only one month. Once the month is selected, the dropdown closes, and the value in the trigger updates.

While a calendar with two month blocks can be displayed, it's more commonly used for range selection.

![](static/monthpicker-normal-2sizes.png)

### Grid margins

![](static/monthpicker-margins-row.png)

## DateRangePicker

Date range picker typically displays two month blocks in the calendar by default. To update the value in the trigger, user must click the "Apply" button after selecting the desired date range.

![](static/daterangepicker-normal.png)

You can add presets for date ranges. Presets and their names may be customized. The selected preset gets `active` status.

![](static/daterangepicker-custom-presets.png)

You also can add the "Reset" button for deselecting the selected values. In this case the trigger changes its value to the placeholder.

![](static/daterangepicker-reset-buttons.png)

### Week picker

Week picker selects a single week and is similar to a regular date range picker, but with only one month block displayed in the dropdown.

![](static/weekpicker.png)

## MonthRangePicker

Month range picker selects a range of several weeks and typically displays two month blocks in the dropdown by default. To update the value in the trigger, user must click the "Apply" button after selecting the desired month range.

![](static/monthrangepicker-normal.png)

You can also add the presets of date ranges for such picker.

![](static/monthrangepicker-presets.png)


## DateRangeComparator

You can compare two date ranges with DateRangeComparator. The ranges can either intersect or not intersect.

Each range in the `DateRangeComparator.Trigger` has an addon with a color: the first range uses the `--date-picker-cell-active` token, and the second range uses the `--date-picker-cell-comparison-active` token.

### Interaction

Table: Interaction states for Date range comparator

| Description | Appearance example    |
| ----------- | --------------------- |
| In the default state, the second period, which is activated by toggling the "Compare to" checkbox, is in a `disabled` state. | ![](static/periods-comparison-1.png) |
| When enabling the comparison period, the focus shifts to the input field for selecting the second period. The preset set with periods changes to the one defined for the second period. | ![](static/periods-comparison-2.png) |
| The selected date is immediately displayed in the input field. | ![](static/periods-comparison-3.png) ![](static/periods-comparison-4.png) |
| The selected periods are applied after clicking the "Apply" button. | ![](static/periods-comparison-5.png) ![](static/periods-comparison-6.png) |
