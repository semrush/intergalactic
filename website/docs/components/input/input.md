---
title: Input
fileSource: input
tabs: Design('input'), A11y('input-a11y'), API('input-api'), Example('input-code'), Changelog('input-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import Input from '@semcore/ui/input';
import { ButtonLink } from '@semcore/ui/button';
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

  return (
    <Input size={size} state={state}>
      {before && <Input.Addon><CheckM /></Input.Addon>}
      <Input.Value
        disabled={disabled}
        readOnly={readOnly}
        placeholder='Placeholder'
        aria-label='Input example'
      />
      {after &&
        <Input.Addon>
          <ButtonLink use='secondary'>
            <ButtonLink.Addon>
              <ArrowRightM />
            </ButtonLink.Addon>
          </ButtonLink>
        </Input.Addon>
      }
    </Input>
  );
};

const App = PlaygroundGeneration(Preview);
</script>

:::

## Description

**Input** is a single-line text field. It's one of the basic components for all kinds of forms, search fields, etc.

## Appearance

### Sizes

The input has two sizes.

Table: Input sizes

| Size (height in px) | Appearance example      |
| ------------------- | ----------------------- |
| M (28px)            | ![](static/input-m.png) |
| L (40px)            | ![](static/input-l.png) |

### Label

We recommend adding a visible text label to the input wherever possible. If the input isn’t required, be sure to mark it with the "optional" text label.

Table: Input text label sizes

| Size (height in px) | Text size | Appearance example            | Margins                              |
| ------------------- | --------- | ----------------------------- | ------------------------------------ |
| M (28px)            | 14px (use `--fs-200`, `--lh-200` tokens) | ![](static/input-label-m.png) ![](static/input-optional-m.png) | ![](static/input-label-margin-m.png) |
| L (40px)            | 16px (use `--fs-300`, `--lh-300` tokens) | ![](static/input-label-l.png) ![](static/input-optional-l.png) | ![](static/input-label-margin-l.png) |

## Addons

**Addon** is a slot inside the input field — to the left and right of the text — for placing buttons, icons, badges, counters, etc. Addon can be non-clickable and clickable.

- When adding an icon before the text (leading addon), use a non-clickable icon. This icon is usually colored to match the text or a different color based on the purpose it serves.
- When adding an addon after the text (trailing addon), you have various options such as a counter, a badge, a spinner, an icon button, or a link. Use [ButtonLink](../button/button.md#button-with-link-styles) without text as an icon button for native semantics and better accessibility.

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
Use the `read-only` state for component that can't be interacted with, except for copy its value. Also use it for links which might be copied.

Use the `disabled` state if the input availability depends on the value of another element.
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

The search input can have a non-clickable icon before the text and a button for clearing the value after the text.

![](static/search.png)

## Input with counter

You can place [Counter](/components/counter/counter) inside the input or next to its label. Counter usually shows the number of available characters, limits, etc. The counter is usually non-clickable.

::: tip
Don’t use the [Tag](/components/tag/tag) component as a counter. It has a different purpose and functionality.
:::

Table: Input with counter

| Size (height in px) | Counter next to the input's label  | Counter inside the input     |
| ------------------- | ---------------------------------- | ---------------------------- |
| M (28px)            | ![](static/counter-M.png)          | ![](static/counter-in-m.png) |
| L (40px)            | ![](static/counter-L.png)          | ![](static/counter-in-l.png) |

## Usage in UX/UI

1. Use input fields only for single-line information. If you need to enter a lot of data, use a [Textarea](/components/textarea/textarea) instead.
2. Label the inputs clearly, so users can quickly understand what data needs to be entered.
3. Select an appropriate width for the input field based on the content to be entered. For example, if it's for a phone number, the input width shouldn't be wider than what's expected for a phone number.

