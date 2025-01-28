---
title: Textarea
fileSource: textarea
tabs: Design('textarea'), A11y('textarea-a11y'), API('textarea-api'), Example('textarea-code'), Changelog('textarea-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';

import TextareaReact from '@semcore/ui/textarea';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

const SIZES = ['m', 'l'];
const STATES = ['normal', 'invalid', 'valid'];
const RESIZE = ['none', 'vertical', 'horizontal', 'both'];

const App = PlaygroundGeneration((createGroupWidgets) => {
  const { bool, radio, select } = createGroupWidgets('Textarea');

  const size = select({
    key: 'size',
    defaultValue: 'm',
    label: 'Size',
    options: SIZES.map((value) => ({
      name: value,
      value,
    })),
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

  const min = select({
    key: 'min',
    defaultValue: 2,
    label: 'Min rows',
    options: [...Array(10)].map((_, i) => ({
      name: i + 1,
      value: i + 1,
    })),
  });

  const max = select({
    key: 'max',
    defaultValue: 10,
    label: 'Max rows',
    options: [...Array(10)].map((_, i) => ({
      name: i + 1,
      value: i + 1,
    })),
  });

  const resize = select({
    key: 'resize',
    defaultValue: 'none',
    label: 'Resize',
    options: RESIZE.map((value) => ({
      name: value,
      value,
    })),
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
    <TextareaReact
      size={size}
      resize={resize}
      state={state}
      disabled={disabled}
      readOnly={readOnly}
      minRows={min}
      maxRows={max}
      placeholder='Placeholder'
      aria-label='Textarea example'
    />
  );
});
</script>

:::

## Description

**Textarea** is a multiline text field designed for capturing a large amount of data, such as comments, descriptions, or lists of links.

## Appearance

### Sizes

Table: Textarea sizes

Size (height in px for one row of text) | Appearance example                 |
| ------------------------------------- | ---------------------------------- |
| M (28px)                              | ![](static/m.png) |
| L (40px)                              | ![](static/l.png) |

## Resize control

You can enable the resize control for the textarea to allow users to adjust its size. They can stretch it horizontally, vertically, or both ways.

When the textarea cannot be stretched, a scrollbar will appear after a certain number of rows. We recommended adding scrollbars when the textarea has at least 4-5 rows.

::: tip
Avoid making the textarea smaller than 160-200px in width and 3-4 rows in height. Working with large amounts of data in smaller sizes can be challenging, especially when it serves as a primary input in a form.
:::

## Counter

Textarea may include a counter displaying the number of characters entered, character limits, etc.

The counter can be positioned next to the text label or close to the textarea itself.

Table: Textarea with counter

| Size (height in px for one row of text) | Input with label       | Input without label    |
| ------------------- | ------------------------------------------ | ---------------------- |
| M (28px)            | ![](static/counter-M.png) | ![](static/counter-inner-M.png) |
| L (40px)            | ![](static/counter-L.png) | ![](static/counter-inner-L.png) |

## Interaction

The styles of the textarea in different states correspond to those of the [Input](/components/input/input) component for the same states.

Table: Textarea states

| State   | Normal          | Focus      | Disabled           | Read-only      |
| ------- | --------------- | ---------- | ------------------ | -------------- |
| Normal  | ![](static/m.png)         | ![](static/m-focus.png)   | ![](static/m-disabled.png) | ![](static/m-readonly.png) |
| Valid   | ![](static/m-valid.png)     | ![](static/m-valid-focus.png)       |               |            |
| Invalid | ![](static/m-invalid.png) | ![](static/m-invalid-focus.png) |              |         |

## Usage in UX/UI

- Use the Textarea when users need to input a substantial amount of data. For short inputs with 1-3 words, use the [Input](/components/input/input) component instead.
- Provide a descriptive name for the textarea so that users understand the type of data they should enter.

