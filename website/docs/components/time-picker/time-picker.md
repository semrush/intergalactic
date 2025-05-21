---
title: TimePicker
fileSource: time-picker
tabs: Design('time-picker'), A11y('time-picker-a11y'), API('time-picker-api'), Example('time-picker-code'), Changelog('time-picker-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';

import Timepicker from '@semcore/time-picker';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

const SIZES = ['m', 'l'];
const STATES = ['normal', 'invalid', 'valid'];

const d = new Date();

const App = PlaygroundGeneration(
  (createGroupWidgets) => {
    const { empty, bool, radio, select, onChange } = createGroupWidgets('Timepicker');

    const value = empty({
      key: 'value',
      defaultValue: `${d.getHours()}:${d.getMinutes()}`,
    });
    const size = radio({
      key: 'size',
      defaultValue: 'm',
      label: 'Size',
      options: SIZES,
    });

    const state = select({
      key: 'state',
      defaultValue: 'normal',
      label: 'State',
      options: STATES.map((value) => ({
        name: value,
        value,
      })),
    });

    const is12Hour = bool({
      key: 'is12Hour',
      defaultValue: false,
      label: '12-hour format',
    });

    const disabled = bool({
      key: 'disabled',
      defaultValue: false,
      label: 'Disabled',
    });

    return (
      <Timepicker
        aria-label='TimePicker example'
        size={size}
        state={state}
        disabled={disabled}
        is12Hour={is12Hour}
        value={value}
        onChange={(value) => onChange('value', value)}
      />
    );
  },
  {
    filterProps: ['onChange', 'value'],
  },
);
</script>

:::

## Description

**Time picker** is a component that consists of comboboxes designed for entering or selecting a time value.

## Component composition

![](static/timepicker-composition.png)

Component consists of the following:

- `TimePicker.Hours`
- `TimePicker.Minutes`
- `TimePicker.Format`
- `TimePicker.Separator`

## Formats

The component includes [comboboxes](/components/auto-suggest/auto-suggest#combobox) inside the input field.

If the user needs to choose the time in a 12-hour format, an additional button for switching between AM/PM is provided, eliminating the need for an extra click on the dropdown.

Table: TimePicker 24-hour and 12-hour formats

| Time format    | Appearance example              |
| -------------- | ------------------------------- |
| 24-hour format | ![](static/input-default-l.png) |
| 12-hour format | ![](static/input-l.png)         |

## Appearance

### Sizes

Table: TimePicker sizes

| Input size (height in px) | Appearance example                 | Paddings                           |
| ------------------------- | ---------------------------------- | ---------------------------------- |
| M (28px)                  | ![](static/input-default-m.png) ![](static/input-m.png) | ![paddings](static/paddings-m.png) |
| L (40px)                  | ![](static/input-default-l.png) ![](static/input-l.png) | ![paddings](static/paddings-l.png) |

## Interaction

The first combobox is used for selecting hours, while the second one is for selecting minutes.

Upon focusing on a combobox, a list with all the possible options is opened. When focusing on this group of controls, the input field is highlighted.

::: tip
The dropdown with the list is shifted to the left by 9px to accurately align the list items with the combobox figures.
:::

![](static/focus-hours-minutes.png)

The button allows the user to switch between AM and PM values with a click.

When the user navigates to a button with the `Tab` key, the button receives `focus` state.

![](static/focus-3.png)

- Users can select the time using the comboboxes with the mouse or enter it manually.
- After completing the first field, the cursor automatically moves to the second field.
- The inputs only accept numeric values with a maximum of two digits in each combobox.

### Comboboxes content

The content of the comboboxes can be exact, up to a minute, or with preset steps.

- In the first case, the combobox step equals one minute, allowing the user to set precise times, such as 13:13.
- In the second case, the combobox step can be adjusted depending on the required time pre-settings. For example, popular steps may include 00, 15, 30, 45, etc., for minutes.

::: tip
Comboboxes content may be both exact, up to a minute, and with the preset step.
:::

## Validation

### When TimePicker needs validation

Validation in this component is required in several cases:

- When there is a selection of multiple time slots, and they cannot be set to equal values.
- When users cannot select times in the past or future. In this case, the time selection also depends on the date selection, and the validation applies to the entire group of controls.

### How validation is performed

- All the fields related to the selection of the date and time receive the status `invalid`.
- A tooltip with the description of the error is shown in the first field without placing the focus on the field.
- Validation occurs upon submitting the entire form.

![](static/validation.png)

