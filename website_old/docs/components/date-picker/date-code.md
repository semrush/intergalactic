---
title: Example
---

@## DatePicker

Widgets for selecting dates and a range of dates. javascript `Date` is returned for `DatePicker` from `onChange`, and javascript `Date` array - for `DateRangePicker` accordingly.

@example datepicker

@## MonthRangePicker

Widgets for selecting a month and a range of months. API analogous to `DatePicker` and `DateRangePicker`.

@example monthpicker

@## Trigger/Popper

To obtain access to internal components you need to explode the component. `Trigger` and `Popper` are wrapped `Dropdown`.Trigger and `Dropdown.Popper`. [All the properties/examples](/components/dropdown/) also work in `DatePicker`.

@example trigger-popper

@## Custom header

Header layout may be changed by further exploding of the component 😏

@example header

@## Custom day

Calendar days may have some metrics. To change the units you should transfer the function to the `Calendar` component body.

@example custom

@## Disabled

You may block some dates or a range of dates (and imagine you are a superhero 🕺🏻).

The `disabled` property accepts an array of dates or an array with two dates for specifying the range, or the `crontab` format for periodical selection of dates.

@example disabled

@## Periods

Periods may be customized or switched off at all, by transferring `periods={[]}`.

@example periods

@## Week picker

Sometimes you need to select only custom period and you can do it by taking all the control in manual mode.

@example hover-week
