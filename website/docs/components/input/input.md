---
title: Input
fileSource: input
tabName: Design
---

@import playground

@## Description

**Input** is a single-line text field. It's one of the basic components for all kinds of forms, search fields, etc.

Other input types for entering certain data:

- [InputMask](/components/input-mask/)
- [InputNumber](/components/input-number/)
- [InputPhone](/components/input-phone/)
- [InputTags](/components/input-tags/)
- [DatePicker](/components/date-picker)
- [TimePicker](/components/time-picker)
- [ColorPicker](/components/color-picker)

@## Sizes

Our input has two sizes.

| Size (height in px) | Appearance example      |
| ------------------- | ----------------------- |
| M (28px)            | ![](static/input-m.png) |
| L (40px)            | ![](static/input-l.png) |

@## Label

We recommend adding a visible text label to the input wherever possible. If the input is not required, be sure to mark it with the text label "optional".

| Size (height in px) | Text size | Appearance example            | Margins                              |
| ------------------- | --------- | ----------------------------- | ------------------------------------ |
| M (28px)            | 14px (use `--fs-200`, `--lh-200` tokens) | ![](static/input-label-m.png) ![](static/input-optional-m.png) | ![](static/input-label-margin-m.png) |
| L (40px)            | 16px (use `--fs-300`, `--lh-300` tokens) | ![](static/input-label-l.png) ![](static/input-optional-l.png) | ![](static/input-label-margin-l.png) |

@## Content and addons

**Addon** is a position inside the input field – to the left and right of the text – for placing icons, badges, counters, etc. Addon can be non-clickable and clickable.

- For addon before the text you can set a non-clickable icon only. Such an icon usually has the color of the text or it is colored in other color according to the problem you are solving. _For example, you can color `Check` icon before the text into `--icon-secondary-success` to accent the status of the input._
- For addon after the text you can set a clickable icon, a counter, a badge, a spinner, an icon button or link. The clickable icon should have `--icon-secondary-neutral` color. While hovering it should change its color to `--icon-secondary-neutral-hover-active` and the cursor to the `pointer`.

| Size | Icon size                                            | Addon's indents                                  | Addon's minimum width                          |
| ---- | ---------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------- |
| M    | M size ![](static/addon-m-icon.png) | ![](static/addon-m-padding.png) | ![](static/addon-m-width.png) |
| L    | M size ![](static/addon-l-icon.png) | ![](static/addon-l-padding.png) | ![](static/addon-l-width.png) |

> If two addons are stacked together, their indents will divide in half to maintain the good clickable zone around them.

![](static/padding_collapse.png)

@## Interaction

| State   | Normal                                               | Focus                                                            | Disabled                                                               | Read-only                                              |
| ------- | ---------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------ |
| Normal  | ![](static/input-normal.png)   | ![](static/input-normal-focus.png)   | ![](static/input-normal-disabled.png)   | ![](static/input-readonly.png) |
| Valid   | ![](static/input-valid.png)     | ![](static/input-valid-focus.png)     | ![](static/input-valid-disabled.png)     |                                                        |
| Invalid | ![](static/input-invalid.png) | ![](static/input-invalid-focus.png) | ![](static/input-invalid-disabled.png) |                                                        |

> Use `read-only` state for component that cannot be interacted with, except for copy its value. Also use it for links which might be copied.
>
> Use `disabled` state if you need to show affect of one component to another.

@## Input types

For code examples of the input types, see [Example tab](/components/input/input-code).

@## Search input

The search input has a non-clickable icon before the text and the icon for clearing the value after the text.

![](static/search.png)

@## Input with a counter

You can place [Counter](/components/counter/) inside the input or next to its label. Counter usually shows the number of available characters, limits, etc. The counter is non-clickable.

> Please do not use the [Tag](/components/tag/) component for the counter. It has a different purpose and functionality.

| Size (height in px) | Counter next to the input's label           | Counter inside the input                       |
| ------------------- | ------------------------------------------- | ---------------------------------------------- |
| M (28px)            | ![](static/counter-M.png) | ![](static/counter-in-m.png) |
| L (40px)            | ![](static/counter-L.png) | ![](static/counter-in-l.png) |

@## Usage in UX/UI

1. Use input only for single-line fields. If you need to enter a large amount of data use [Textarea](/components/textarea/).
2. Label the inputs so user can understand at a glance what data needs to be entered.
3. Choose the input's width relevant to the content that should be entered in the input field. _For example, if you have an input for a phone number, the input width should not be more than the expected width of the phone number._

@page input-a11y
@page input-api
@page input-code
@page input-changelog
