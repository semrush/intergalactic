---
title: Textarea
fileSource: textarea
tabName: Design
---

@import playground

@## Description

**Textarea** is a multiline text field. This component is useful for adding large amount of data: comment, description, link list, etc.

@## Sizes

| Size (height in px) | Appearance example                 |
| ------------------- | ---------------------------------- |
| M (28px)            | ![input with M size](static/m.png) |
| L (40px)            | ![input with L size](static/l.png) |

### Resize control

You can enable the resize control for the textarea to change its size. So user can stretch only horizontally, only vertically, or both vertically and horizontally.

When textarea cannot be stretched, show scrollbar after a certain number of lines. **The minimum number of lines after which we recommended to use scroll is 4-5.**

> **Do not make the textarea smaller than 160-200px in width and 3-4 lines in height**. It is very difficult to work with large amounts of data in sizes smaller than these are. This is especially important when such an input is basic input in a form.

@## Counter

Textarea may contain a counter showing the number of entered and/or available characters, limits, etc.

The counter can be placed either next to the text label or near the textarea itself.

| Size (height in px) | Input with label                                       | Input without label                                          |
| ------------------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| M (28px)            | ![input with M size and counter](static/counter-M.png) | ![input with M size and counter](static/counter-inner-M.png) |
| L (40px)            | ![input with L size and counter](static/counter-L.png) | ![input with L size and counter](static/counter-inner-L.png) |

@## Interaction

Styles of the textarea in different states correspond to the styles of the [Input](/components/input/) for such states.

| State   | Normal                                 | Focus                                                     | Disabled                                 | Read-only                                |
| ------- | -------------------------------------- | --------------------------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| Normal  | ![default input](static/m.png)         | ![default focus](static/m-focus.png)                      | ![disabled input](static/m-disabled.png) | ![readonly input](static/m-readonly.png) |
| Valid   | ![valid input](static/m-valid.png)     | ![input with valid focus](static/m-valid-focus.png)       |                                          |                                          |
| Invalid | ![invalid input](static/m-invalid.png) | ![ininput with invalid focus](static/m-invalid-focus.png) |                                          |                                          |

@## Use in UX/UI

- Textarea is useful when user needs to enter a large amount of data. If user needs to enter 1-3 words, use [Input](/components/input/) instead.
- Name the textarea in such a way that user understands what data should be entered.

@page textarea-a11y
@page textarea-api
@page textarea-code
@page textarea-changelog
