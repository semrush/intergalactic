---
title: BulkTextarea
tabs: Design('bulk-textarea'), A11y('bulk-textarea-a11y'), API('bulk-textarea-api'), Example('bulk-textarea-code'), Changelog('bulk-textarea-changelog')
---

## What component has

### Roles and attributes

The following list describes roles and attributes that component already has.

Table: Roles and attributes

| Component                                      | Role / Attribute                                         | Usage                                                                                                                                                          |
| ---------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BulkTextarea.InputField > div`                | `textbox`                                                | Identifies a field that allows the input of free-form text.                                                                                                    |
|                                                | `aria-multiline=”true”`                                  | Indicates that a textbox accepts multiple lines of input.                                                                                                      |
|                                                | `aria-labelledby="IDREF"`                                | Refers to the element that contains the label of field.                                                                                                        |
|                                                | `aria-describedby="IDREF"`                               | Gives the item an accessible description. In invalid state, refers to the error message. |
| `BulkTextarea.Counter`                         | `aria-label="{n} out of {n}"`                            | Sets an accessible name for the element.                                                                                                                       |
|                                                | `"aria-label={n} out of {n}, limit reached"`             | Sets an accessible name for the element.                                                                                                                       |
|                                                | `"aria-label={n} out of {n}, limit exceeded"`            | Sets an accessible name for the element.                                                                                                                       |
| Buttons inside `BulkTextarea.ErrorsNavigation` | `aria-label="Next error"`, `aria-label="Previous error"` | Sets an accessible names for the buttons with no text.                                                                                                         |

### Keyboard support

For detailed information about keyboard support for the Input, refer to the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#input-and-textarea).

## Considerations for developers and designers

::: tip
Error messages aren't set by default in the component.
:::

Configure error messages for tooltips so they're visible to sighted users and announced by assistive technologies:

- A `data-errormessage` for specific errors in invalid lines. By default `data-errormessage`has `undefined` value.
- A message for the whole input if you’re validating the entire field.

## Other recommendations

For more accessibility recommendations, refer to the the common [Accessibility guide](/core-principles/a11y/a11y).
