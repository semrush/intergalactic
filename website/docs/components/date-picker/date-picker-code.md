---
title: DatePicker
fileSource: date-picker
tabs: Design('date-picker'), A11y('date-picker-a11y'), API('date-picker-api'), Example('date-picker-code'), Changelog('date-picker-changelog')
---

## DatePicker

These are widgets for selecting dates and date ranges. The `DatePicker` component returns a JavaScript `Date` object via the `onChange` function, while the `DateRangePicker` returns a JavaScript `Date` array.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/date-picker/docs/examples/datepicker.tsx';
</script>

:::

## MonthRangePicker

These are widgets for selecting a single month and a range of months, respectively. The API is similar to that of the `DatePicker` and `DateRangePicker` components.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/date-picker/docs/examples/monthrangepicker.tsx';
</script>

:::

## Trigger and Popper

To access the internal components, you must expand the component. The `Trigger` and `Popper` components are wrapped by `Dropdown.Trigger` and `Dropdown.Popper`, respectively. All the properties and examples available in `Dropdown` also work in `DatePicker`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/date-picker/docs/examples/trigger_and_popper.tsx';
</script>

:::

## Custom header

You can change the header layout by expanding the component further.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/date-picker/docs/examples/custom_header.tsx';
</script>

:::

## Custom day

Calendar days can have metrics, and you can change the units by passing a function to the `Calendar` component.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/date-picker/docs/examples/custom_day.tsx';
</script>

:::

## Disabled dates

You can prevent selection of certain dates or a range of dates using the `disabled` property (and imagine yourself as a superhero 🕺🏻). The property takes an array of dates or an array with two dates to specify a range, or a `crontab` format for selecting dates periodically.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/date-picker/docs/examples/disabled_dates.tsx';
</script>

:::

## Custom date ranges

Date ranges may be customized or switched off at all, by transferring `periods={[]}`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/date-picker/docs/examples/custom_date_ranges.tsx';
</script>

:::

## Week picker

You can manually select a custom period, if needed (for example, a week) by taking all the control in manual mode. For example, you can create the WeekPeaker using DateRangePicker.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/date-picker/docs/examples/week_picker.tsx';
</script>

:::

## DateRangeComparator

DateRangeComparator allows user to compare two date ranges. Additional date range may be controlled with `compare` and `onCompareChange` props.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/date-picker/docs/examples/date_range_comparator.tsx';
</script>

:::

## DateRangeComparator advanced usage

`DateRangeComparator` internal structure maybe deeply redefined for flexible customization.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/date-picker/docs/examples/date_range_comparator_advanced_use.tsx';
</script>

:::

## MonthRangeComparator advanced usage

`MonthDateRangeComparator` internal structure maybe deeply redefined for flexible customization.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/date-picker/docs/examples/month_range_comparator_advanced_use.tsx';
</script>

:::