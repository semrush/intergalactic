---
title: API
fileSource: date-picker
---

@## DatePicker/MonthPicker

Widget for selecting the date/month.

```jsx
import { DatePicker, MonthPicker } from '@semcore/date-picker';
<DatePicker />;
<MonthPicker />;
```

@typescript IDatePickerProps

@## DateRangePicker

Widget for selecting the range of dates/months.

```jsx
import { DateRangePicker, MonthRangePicker } from '@semcore/date-picker';
<DateRangePicker />;
<MonthRangePicker />;
```

@typescript IDateRangePickerProps

@## DatePicker.Trigger/DateRangePicker.Trigger

Trigger button, exists by default. `DateRangePicker` has the same interface.

```jsx
import { DatePicker } from '@semcore/date-picker';
<DatePicker.Trigger />;
```

@## DateRangePicker.Period

Component for rendering the configurable periods.

```jsx
import { DateRangePicker } from '@semcore/date-picker';
<DateRangePicker.Period />;
```

@typescript IDateRangePickerPeriodProps

@## Calendar

Calendar component 📅

```jsx
import { DatePicker, MonthPicker } from '@semcore/date-picker';
<DatePicker.Calendar />;
<MonthPicker.Calendar />;
```

@typescript ICalendarProps

@## Calendar.Unit

The unit inside the calendar.

```jsx
import { DatePicker, MonthPicker } from '@semcore/date-picker';
<DatePicker.Calendar.Unit />;
<MonthPicker.Calendar.Unit />;
```

@typescript ICalendarUnitProps
