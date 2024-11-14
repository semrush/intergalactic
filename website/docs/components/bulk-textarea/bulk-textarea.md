---
title: BulkTextarea
tabs: Design('bulk-textarea'), A11y('bulk-textarea-a11y'), API('bulk-textarea-api'), Example('bulk-textarea-code'), Changelog('bulk-textarea-changelog')
---

## Description

**BulkTextarea** is a multiline text field designed for capturing lists of comma-separated values.

## Component composition

![](static/bulktextarea-composition.png)

Component consists of the following:

_(THESE NAMES ARE TEMPORARY, WILL BE UPDATED ACCORDING TO THE ACTUAL COMPONENT)_

- `BulkTextarea.Label`
- `BulkTextarea.Textarea`
- `BulkTextarea.TextareaRows`
- `BulkTextarea.TextareaRowsItem`
- `BulkTextarea.Navigation`
- `BulkTextarea.ClearButton`

## Sizes

Component has two sizes:

Table: BulkTextarea sizes

| Size (font size) | Appearance example     |
| ---------------- | ---------------------- |
| M (`--fs-200`)   | ![](static/bulk-m.png) |
| L (`--fs-300`)   | ![](static/bulk-l.png) |

## Counter

BulkTextarea includes a counter displaying the number of rows entered. It's always positioned next to the text label.

Table: BulkTextarea with counter

| Size (font size) | Input with label       |
| ---------------- | ---------------------- |
| M (`--fs-200`)   | ![](static/bulk-m.png) |
| L (`--fs-300`)   | ![](static/bulk-l.png) |

## Controls

In the component, the controls have a default placement, but if you need to position them elsewhere, you can expand the component and arrange them differently. [Refer to the example]().

### Clear field button

As soon as at least one character is entered in the field, a button for clearing the field appears next to it. By default, the button is positioned to the bottom right of the field.

![](static/bulktextarea-clear-button.png)

### Navigation buttons

Error navigation appears after the values in the field have been validated. Next to the buttons, we show the number of errors in the field.

![](static/bulktextarea-error-navigation.png)

When clicking the buttons, cursor moves to the first or last invalid row, depending on the button. The entire value in the row is selected so the user can quickly delete it. The text next to the buttons changes to "n out of n," including when we move the cursor directly to an invalid row.

![](static/bulktextarea-error-navigation-1.png)

When navigating between invalid rows, this text next to the buttons is recalculated.

If we move from an invalid row to a valid row, the counter remains at its previous value.

### Resize control

You can enable the resize control for the textarea to allow users to adjust its size. They can stretch it horizontally, vertically, or both ways.

When the textarea cannot be stretched, a scrollbar will appear after a certain number of lines. We recommended adding scrollbars when the textarea has at least 5 lines.

::: tip
Avoid making the textarea smaller than 160-200px in width and 3-4 lines in height. Working with large amounts of data in smaller sizes can be challenging, especially when it serves as a primary input in a form.
:::

## Interaction

### Rows

### Validation

## Usage in UX/UI
