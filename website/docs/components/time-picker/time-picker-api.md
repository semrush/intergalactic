---
title: TimePicker
fileSource: time-picker
tabs: Design('time-picker'), A11y('time-picker-a11y'), API('time-picker-api'), Examples('time-picker-code'), Changelog('time-picker-changelog')
---

## Time picker

```jsx
import Timepicker from '@semcore/ui/time-picker';
```

<TypesView type="NSTimePicker.Props" :types={...types} />

## TimePicker.Hours, TimePicker.Minutes

<TypesView type="NSTimePicker.FieldProps" :types={...types} />

```jsx
import Timepicker from '@semcore/ui/time-picker';
<Timepicker>
  <Timepicker.Hours />
  <Timepicker.Minutes />
</Timepicker>;
```

## TimePicker.Format

<TypesView type="NSTimePicker.Format.Props" :types={...types} />

```jsx
import Timepicker from '@semcore/ui/time-picker';
<Timepicker.Format />;
```

## TimePicker.Separator

An HTML `span` element. Accepts the HTML attributes for `span`.

```jsx
import Timepicker from '@semcore/ui/time-picker';
<Timepicker.Separator />;
```

<script setup>import { data as types } from '@types.data.ts';</script>
