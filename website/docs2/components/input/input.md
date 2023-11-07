---
title: Input
fileSource: input
tabs: Design('input'), A11y('input-a11y'), API('input-api'), Example('input-code'), Changelog('input-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import Input from '@semcore/ui/input';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

import CheckM from '@semcore/ui/icon/Check/m';
import ArrowRightM from '@semcore/ui/icon/ArrowRight/m';

const SIZES = ['m', 'l'];
const STATES = ['normal', 'invalid', 'valid'];

const Preview = (preview) => {
  const { bool, select, radio } = preview('Input');

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

  const before = bool({
    key: 'before',
    defaultValue: false,
    label: 'AddonLeft',
  });

  const after = bool({
    key: 'after',
    defaultValue: false,
    label: 'AddonRight',
  });

  const disabled = bool({
    key: 'disabled',
    defaultValue: false,
    label: 'Disabled',
  });

  const readOnly = bool({
    key: 'readOnly',
    defaultValue: false,
    label: 'Read-only',
  });

  const beforeIconMap = {
    l: <CheckM />,
    m: <CheckM />,
  };
  const afterIconMap = {
    l: <ArrowRightM />,
    m: <ArrowRightM />,
  };

  const renderIcon = (position, size) => {
    switch (position) {
      case 'before':
        return beforeIconMap[size];
      case 'after':
        return afterIconMap[size];
      default:
        return false;
    }
  };

  return (
    <Input size={size} state={state}>
      {before && <Input.Addon>{renderIcon(before && 'before', size)}</Input.Addon>}
      <Input.Value disabled={disabled} readOnly={readOnly} placeholder='Placeholder' />
      {after && <Input.Addon interactive>{renderIcon(after && 'after', size)}</Input.Addon>}
    </Input>
  );
};

const App = PlaygroundGeneration(Preview);
</script>

:::

## Description

**Input** is a single-line text field. It's one of the basic components for all kinds of forms, search fields, etc.

Other input types for entering certain data:

- [InputMask](/components/input-mask/input-mask)
- [InputNumber](/components/input-number/input-number)
- [InputPhone](/components/input-phone/input-phone)
- [InputTags](/components/input-tags/input-tags)
- [DatePicker](/components/date-picker/date-picker)
- [TimePicker](/components/time-picker/time-picker)
- [ColorPicker](/components/color-picker/color-picker)
- [Checkbox](/components/checkbox/checkbox)
- [Radio](/components/radio/radio)

## Sizes

The input has two sizes.

Table: Input sizes

| Size (height in px) | Appearance example      |
| ------------------- | ----------------------- |
| M (28px)            | ![](static/input-m.png) |
| L (40px)            | ![](static/input-l.png) |

## Label

We recommend adding a visible text label to the input wherever possible. If the input isn’t required, be sure to mark it with the "optional" text label.

Table: Input text label sizes

| Size (height in px) | Text size | Appearance example            | Margins                              |
| ------------------- | --------- | ----------------------------- | ------------------------------------ |
| M (28px)            | 14px (use `--fs-200`, `--lh-200` tokens) | ![](static/input-label-m.png) ![](static/input-optional-m.png) | ![](static/input-label-margin-m.png) |
| L (40px)            | 16px (use `--fs-300`, `--lh-300` tokens) | ![](static/input-label-l.png) ![](static/input-optional-l.png) | ![](static/input-label-margin-l.png) |

## Addons

**Addon** is a slot inside the input field – to the left and right of the text – for placing icons, badges, counters, etc. Addon can be non-clickable and clickable.

- When adding an icon before the text (leading addon), use a non-clickable icon. This icon is usually colored to match the text or a different color based on the purpose it serves.
- When adding an addon after the text (trailing addon), you have various options such as a clickable icon, a counter, a badge, a spinner, an icon button, or a link. The clickable icon should have the `--icon-secondary-neutral` color. When hovering over it, the color should change to `--icon-secondary-neutral-hover-active`, and the cursor should change to a pointer.

Table: Input addon indents and sizes

| Input size | Icon size   | Addon's indents      | Addon's minimum width       |
| ---------- | ----------- | -------------------- | --------------------------- |
| M    | M size ![](static/addon-m-icon.png) | ![](static/addon-m-padding.png) | ![](static/addon-m-width.png) |
| L    | M size ![](static/addon-l-icon.png) | ![](static/addon-l-padding.png) | ![](static/addon-l-width.png) |

::: tip
When two addons are stacked together, their indents will be divided in half. This ensures that there is a sufficient clickable zone (touch target) around each addon.
:::

![](static/padding_collapse.png)

## Interaction

::: tip
Use `read-only` state for component that cannot be interacted with, except for copy its value. Also use it for links which might be copied.

Use `disabled` state if you need to show affect of one component to another.
:::

Table: Input states

| State   | Normal        | Focus                 | Disabled       | Read-only     |
| ------- | ------------- | --------------------- | -------------- | ------------- |
| Normal  | ![](static/input-normal.png)   | ![](static/input-normal-focus.png)   | ![](static/input-normal-disabled.png)   | ![](static/input-readonly.png) |
| Valid   | ![](static/input-valid.png)     | ![](static/input-valid-focus.png)     | ![](static/input-valid-disabled.png)     |                                                        |
| Invalid | ![](static/input-invalid.png) | ![](static/input-invalid-focus.png) | ![](static/input-invalid-disabled.png) |                                                    |

## Input types

For live examples of the input types, refer to [Example tab](/components/input/input-code).

## Search input

The search input can have a non-clickable icon before the text and the icon for clearing the value after the text.

![](static/search.png)

## Input with a counter

You can place [Counter](/components/counter/counter) inside the input or next to its label. Counter usually shows the number of available characters, limits, etc. The counter is usually non-clickable.

::: tip
Please don’t use the [Tag](/components/tag/tag) component for the counter. It has a different purpose and functionality.
:::

Table: Input with counter

| Size (height in px) | Counter next to the input's label  | Counter inside the input     |
| ------------------- | ---------------------------------- | ---------------------------- |
| M (28px)            | ![](static/counter-M.png)          | ![](static/counter-in-m.png) |
| L (40px)            | ![](static/counter-L.png)          | ![](static/counter-in-l.png) |

## Usage in UX/UI

1. Use input fields only for single-line information. If you need to enter a lot of data, use a [Textarea](/components/textarea/textarea) instead.
2. Label the inputs clearly, so users can quickly understand what data needs to be entered.
3. Select an appropriate width for the input field based on the content to be entered. For example, if it's for a phone number, the input width shouldn't be wider than what is expected for a phone number.

