---
title: DatePicker
fileSource: date-picker
tabs: Design('date-picker'), A11y('date-picker-a11y'), API('date-picker-api'), Example('date-picker-code'), Changelog('date-picker-changelog')
---

## DatePicker and MonthPicker

Widget for selecting the date/month.

```jsx
import { DatePicker, MonthPicker } from '@semcore/ui/date-picker';
<DatePicker />;
<MonthPicker />;
```

<TypesView type="DatePickerProps" :types={...types} />

## DateRangePicker

Widget for selecting the range of dates/months.

```jsx
import { DateRangePicker, MonthRangePicker } from '@semcore/ui/date-picker';
<DateRangePicker />;
<MonthRangePicker />;
```

<TypesView type="DateRangePickerProps" :types={...types} />

## DatePicker.Trigger and DateRangePicker.Trigger

Trigger input, exists by default. `DateRangePicker` has the same interface.

```jsx
import { DatePicker } from '@semcore/ui/date-picker';
<DatePicker.Trigger />;
```

<TypesView type="BaseTriggerProps" :types={...types} />

## DateRangePicker.Period

Component for rendering the configurable periods.

```jsx
import { DateRangePicker } from '@semcore/ui/date-picker';
<DateRangePicker.Period />;
```

<TypesView type="DateRangePickerPeriodProps" :types={...types} />

## Calendar

Calendar component 📅

```jsx
import { DatePicker, MonthPicker } from '@semcore/ui/date-picker';
<DatePicker.Calendar />;
<MonthPicker.Calendar />;
```

<TypesView type="CalendarProps" :types={...types} />

## Calendar.Unit

The unit inside the calendar.

```jsx
import { DatePicker, MonthPicker } from '@semcore/ui/date-picker';
<DatePicker.Calendar.Unit />;
<MonthPicker.Calendar.Unit />;
```

<TypesView type="CalendarUnitProps" :types={...types} />

## DateRangeComparator

Same API for `MonthDateRangeComparator`.

<TypesView type="DateRangeComparatorProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
