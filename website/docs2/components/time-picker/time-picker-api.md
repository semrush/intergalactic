---
title: API
fileSource: time-picker
tabs: TimePicker('time-picker'), A11y('time-picker-a11y'), API('time-picker-api'), Example('time-picker-code'), Changelog('time-picker-changelog')
---

## Time picker

```jsx
import Timepicker from '@semcore/ui/time-picker';
```

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

<TypesView type="TimePickerProps" :types={...types} />

## TimePicker.Hours, TimePicker.Minutes

<TypesView type="TimePickerItemProps" :types={...types} />

```jsx
import Timepicker from '@semcore/ui/time-picker';
<Timepicker>
  <Timepicker.Hours />
  <Timepicker.Minutes />
</Timepicker>;
```

## TimePicker.Format

<TypesView type="TimePickerFormatProps" :types={...types} />

```jsx
import Timepicker from '@semcore/ui/time-picker';
<Timepicker.Format />;
```

## TimePicker.Separator

It is a usual `span`-element, it takes the HTML-attributes available for it.

```jsx
import Timepicker from '@semcore/ui/time-picker';
<Timepicker.Separator />;
```
