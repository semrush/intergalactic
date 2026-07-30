---
title: BulkTextarea
tabs: Design('bulk-textarea'), A11y('bulk-textarea-a11y'), API('bulk-textarea-api'), Examples('bulk-textarea-code'), Changelog('bulk-textarea-changelog')
---

## What component has

### Roles and attributes

The following list describes roles and attributes that the component already has.

Table: Roles and attributes

| Component | Role / Attribute | Usage |
| --- | --- | --- |
| `BulkTextarea.InputField > ol` | Native `list` semantics | The editable area is an ordered list. Each entered value is rendered as an `li` with native `listitem` semantics. |
| | `contenteditable` | Is `true` for an enabled editable field and `false` for readonly or disabled states. |
| | `tabindex` | Is `0` when the field is enabled, including readonly mode, and `-1` when disabled. |
| | `aria-labelledby="IDREF"` | Refers to the element that contains the label of the editable list. |
| | `aria-describedby="IDREF"` | References the counter in the normal state. When errors are shown, it references the visible error tooltip instead. |
| | `aria-invalid="true"` | Is set when errors are shown for the field. |
| Invalid `li` | `aria-invalid="true"` | Identifies an invalid value in the list. |
| `BulkTextarea.Counter` | Screen-reader-only text: `of {n} lines` | Completes the visible current-line count with the allowed number of lines. |
| | Screen-reader-only text: `Limit reached` | Is announced when the number of lines equals the limit. |
| | Screen-reader-only text: `Limit exceeded` | Is announced when the number of lines exceeds the limit. |
| Buttons inside `BulkTextarea.ErrorsNavigation` | `aria-label="Next error"`, `aria-label="Previous error"` | Sets accessible names for icon-only error-navigation buttons. |

### Keyboard support

The field supports keyboard editing of an ordered list. Enter creates a new line; arrow keys, Backspace, and Delete move between or modify lines. Cmd/Ctrl+Z undoes changes, and Cmd/Ctrl+Shift+Z or Ctrl+Y redoes changes. `BulkTextarea.ErrorsNavigation` moves focus to the corresponding invalid line, and Clear all returns focus to the editable list.

For detailed information about general keyboard support, refer to the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#input-and-textarea).

## Considerations for developers and designers

::: tip
Provide an accessible name for the editable list. Pass `aria-labelledby` to `BulkTextarea.InputField` to reference a visible label, or pass `aria-label` when no visible label is available. A placeholder, including a multiline placeholder, is visual guidance only and doesn't replace a label.
:::

Configure error messages for tooltips so they're visible to sighted users and announced by assistive technologies:

- Use `lineValidation` to return a clear message for each invalid value and `commonErrorMessage` for a field-level error when needed.
- When errors are displayed, the field and invalid lines receive `aria-invalid`; the active error tooltip is associated with the field through `aria-describedby`.
- `data-errormessage` is an internal data attribute used to store a line error. It's not an ARIA attribute and shouldn't be the only way to expose an error message to assistive technologies.

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).
