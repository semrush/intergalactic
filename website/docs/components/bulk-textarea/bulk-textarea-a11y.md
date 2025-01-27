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
|                                                | `aria-describedby="IDREF"`                               | Gives the item an accessible description by referring to the `aria-errormessage`, the tooltip, or both, describing the primary message or purpose of the item. |
| `BulkTextarea.InputField > div > p`            | `aria-invalid="true"`                                    | A row gets this property when it gets the `invalid` status.                                                                                                    |
|                                                | `aria-errormessage="[Your message here]"`                | Identifies the element that provides an error message for the .                                                                                                |
| `BulkTextarea.Counter`                         | `aria-label="{n} out of {n}"`                            | Sets an accessible name for the element.                                                                                                                       |
|                                                | `"aria-label={n} out of {n}, limit reached"`             | Sets an accessible name for the element.                                                                                                                       |
|                                                | `"aria-label={n} out of {n}, limit exceeded"`            | Sets an accessible name for the element.                                                                                                                       |
| Buttons inside `BulkTextarea.ErrorsNavigation` | `aria-label="Next error"`, `aria-label="Previous error"` | Sets an accessible names for the buttons with no text.                                                                                                         |

<!-- | CHECK p rows | `aria-live="polite"` | Identifies the container element as a live region in the "polite" state, meaning assistive technology users are informed of changes to the region at the next available opportunity. Announces live message:"Keyword {2}", on each keyboard navigation (Up/Down key) within the textbox rows without errors. |
| CHECK IF NEEDED `BulkTextarea.ErrorItem` | `aria-hidden="true"` | Hides noninteractive icon from the assistive technologies.
| CHECK | `aria-live="polite"` | Identifies the container element as a live region in the "polite" state, meaning assistive technology users are informed of changes to the region at the next available opportunity. Announces live message:"Error {n} out of {n}", while navigating between the errors using buttons. | |
-->

### Keyboard support

For detailed information about keyboard support for the Input, refer to the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#input_i_textarea).

## Considerations for developers and designers

::: tip
Error messages aren't set by default in the component.
:::

Configure error messages for tooltips so they are visible to sighted users and announced by assistive technologies:

- A message for specific errors in invalid rows, based on your validation rules.
- A message for the entire input if you’re validating the entire field.

## Other recommendations

For more accessibility recommendations, refer to the the common [Accessibility guide](/core-principles/a11y/a11y).
