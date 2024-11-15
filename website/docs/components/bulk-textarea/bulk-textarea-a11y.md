---
title: BulkTextarea
tabs: Design('bulk-textarea'), A11y('bulk-textarea-a11y'), API('bulk-textarea-api'), Example('bulk-textarea-code'), Changelog('bulk-textarea-changelog')
---

_**THIS DOCUMENTATION SHOULD BE CHECKED AND UPDATED AFTER THE COMPONENT WILL BE IMPLEMENTED.**_

## What component has

### Roles and attributes

The following list describes roles and attributes that component already has.

Table: Roles and attributes

| Component               | Role / Attribute        | Usage                                                        |
| ----------------------- | ----------------------- | ------------------------------------------------------------ |
| `BulkTextarea.Textarea` | `textbox`               | Identifies an field that allows the input of free-form text. |
|                         | `aria-multiline=”true”` | Indicates that a textbox accepts multiple lines of input.    |

### Keyboard support

See detailed information about the keyboard support for the Input in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#input_i_textarea).

## Considerations for developers

- Keep it simple - not all browsers correctly expose multiple labels that are linked to the same form element.
- Use labels for every input and make the `for=""` and `id=""` values match. IDs must be unique on each page, only one label can be associated to each unique form element. Make required fields obvious by using an indicator – asterisk, description text, etc.
- Fields with error validation should have `aria-describedby` to insure that the associated field level error message is read by assistive technology. If the error message has an `id="my-error-message"`, then the input should have `aria-describedby="my-error-message"`.

## Resources

- [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-text-fields) describes core principles for the accessible inputs and textarea.
- Find live examples of accessible inputs with different types in [DigitalA11y project](https://www.digitala11y.com/demos/accessibility-of-html-input-types-examples/).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
