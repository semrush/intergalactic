---
title: BulkTextarea
tabs: Design('bulk-textarea'), A11y('bulk-textarea-a11y'), API('bulk-textarea-api'), Example('bulk-textarea-code'), Changelog('bulk-textarea-changelog')
---

## Description

**BulkTextarea** is a multiline text field designed for entering lists of comma-separated values.

You can enter a list manually using **Enter** or a comma, or paste a comma-separated list. You can also define your own rules for splitting values into lines.

This component also provides the possibility to validate every line and the whole input.

## Component composition

![](static/bulktextarea-composition.png)

Component consists of the following:

- `BulkTextarea.InputField`
- `BulkTextarea.Counter`
- `BulkTextarea.ErrorItem`
- `BulkTextarea.ErrorsNavigation`
- `BulkTextarea.ClearAll`

## Appearance

### Sizes

Component has two sizes:

- M, with `--fs-200` font size
- L, with `--fs-300` font size

### Lines

Each line is numbered. Lines that fail validation are marked with a `Warning` icon on the right. Lines with values that exceed the limit are highlighted.

![](static/bulktextarea-lines.png)

### Width and height

Avoid making the textarea smaller than 160–200px in width and 3–4 rows in height. Working with large amounts of data in smaller sizes can be challenging, especially when it serves as a primary input in a form.

## Counter

BulkTextarea includes a counter displaying the number of values entered. It's always positioned next to the text label.

Different BulkTextarea sizes use different counter sizes:

- M, uses Counter with L size
- L, uses Counter with XL size

### How counter works

1. The counter shows the value limit and updates once user enters at least one character on the line.
2. The counter updates if the user deletes a character and a line.
3. If the user presses **Enter** or types a comma on an empty line, they stay on the same line. This helps avoid adding unnecessary blank lines.
4. For now duplicate lines are counted.

### Values near and above limit

When the number of values reaches the limit, the counter changes its theme to `warning`.

![](static/values-limit.png)

Lines with values that exceed the limit are highlighted. Counter changes its theme to `danger`.

![](static/values-off-limit.png)

## Controls

In the component, the controls have a default placement, but if you need to position them elsewhere, you can arrange them differently.

### Clear all button

As soon as at least one character is entered in the field, a button for clearing the field appears next to it. By default, the button is positioned to the bottom right of the field.

![](static/bulktextarea-clear-button.png)

### Navigation buttons

Error navigation shows up after all the values or a single value (depending on the validation method) are validated. The number of errors is shown next to the buttons.

![](static/bulktextarea-error-navigation.png)

When a button is activated, cursor moves to the first or last invalid line, depending on the button. The entire line's value is selected for quick deletion. The text next to the navigation buttons updates to _"n out of n"_ when the cursor is moved using the buttons, keyboard, or mouse.

![](static/bulktextarea-error-navigation-1.png)

When navigating between invalid lines, the text next to the buttons is updated. If you move from an invalid line to a valid line, the counter in the text stays the same.

<!-- Hiding this section since for now component doesn't have it.
 ### Resize control

You can enable the resize control for the textarea, allowing users to adjust its size. They can stretch it horizontally, vertically, or both ways.

When the textarea cannot be stretched further, a scrollbar will appear after a certain number of lines. We recommend adding scrollbars when the textarea has at least 5 lines.

::: tip
Avoid making the textarea smaller than 160–200px in width and 3–4 rows in height. Working with large amounts of data in smaller sizes can be challenging, especially when it serves as a primary input in a form.
::: -->

## Interaction

### States

BulkTextarea has the same states and styles as [Textarea](/components/textarea/textarea#interaction).

### Validation

You can define your own validation rules for the input: on submit, on blur, or on line blur. By default, our component uses on blur validation.

### Tooltips

If the textarea has invalid values after validation, show a tooltip for the whole field or for specific lines when hovered or when the caret is in the line.

![](static/bulktextarea-tooltip.png)

![](static/bulktextarea-tooltip-line.png)
