---
title: Example
fileSource: date-picker
---

@## DatePicker

These are widgets for selecting dates and date ranges. The `DatePicker` component returns a JavaScript `Date` object via the `onChange` function, while the `DateRangePicker` returns a JavaScript `Date` array.

@example datepicker

@## MonthRangePicker

These are widgets for selecting a single month and a range of months, respectively. The API is similar to that of the `DatePicker` and `DateRangePicker` components.

@example monthpicker

@## InputTrigger and Popper

To access the internal components, you must expand the component. The `InputTrigger` and `Popper` components are wrapped by `Dropdown.Trigger` and `Dropdown.Popper`, respectively. All the properties and examples available in `Dropdown` also work in `DatePicker`.

@example trigger-popper

@## Custom header

You can change the header layout by expanding the component further.

@example header

@## Custom day

Calendar days can have metrics, and you can change the units by passing a function to the `Calendar` component.

@example custom

@## Disabled

You can prevent selection of certain dates or a range of dates using the `disabled` property (and imagine yourself as a superhero 🕺🏻). The property takes an array of dates or an array with two dates to specify a range, or a `crontab` format for selecting dates periodically.

@example disabled

@## Custom date ranges

Date ranges may be customized or switched off at all, by transferring `periods={[]}`.

@example periods

@## Week picker

You can manually select a custom period, if needed (e.g., a week) by taking all the control in manual mode.

@example hover-week
