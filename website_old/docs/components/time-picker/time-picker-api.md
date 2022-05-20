---
title: API
---

@## Time picker

```jsx
import Timepicker from '@semcore/time-picker';
```

@interface ITimePickerProps

### TimePicker.Hours, TimePicker.Minutes

@interface ITimePickerItemProps

```jsx
import Timepicker from '@semcore/time-picker';
<Timepicker>
  <Timepicker.Hours />
  <Timepicker.Minutes />
</Timepicker>;
```

### TimePicker.Format

@interface ITimePickerFormatProps

```jsx
import Timepicker from '@semcore/time-picker';
<Timepicker.Format />;
```

### TimePicker.Separator

It is a usual `span`-element, it takes the HTML-attributes available for it.

```jsx
import Timepicker from '@semcore/time-picker';
<Timepicker.Separator />;
```
