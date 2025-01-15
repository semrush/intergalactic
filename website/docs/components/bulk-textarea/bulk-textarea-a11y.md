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
| `BulkTextarea.InputField` | `textbox`               | Identifies an field that allows the input of free-form text. |
|                         | `aria-multiline=”true”` | Indicates that a textbox accepts multiple lines of input.    |
| CHECK if it is about rows | `aria-live="polite"` | Identifies the container element as a live region in the "polite" state, meaning assistive technology users are informed of changes to the region at the next available opportunity. Announces live message:"Keyword {2}", on each keyboard navigation (Up/Down key) within the textbox rows without errors. |
| `BulkTextarea.Counter` | `aria-label="{n} out of {n}"` | Sets an accessible name for the element. |
| | `"aria-label={n} out of {n}, limit reached"` | Sets an accessible name for the element. |
| | `"aria-label={n} out of {n}, limit exceeded"` | Sets an accessible name for the element. |
| Buttons inside `BulkTextarea.ErrorsNavigation` | `aria-label="Next error"`, `aria-label="Previous error"` | Sets an accessible names for the elements. |
| CHECK | `aria-live="polite"` | Identifies the container element as a live region in the "polite" state, meaning assistive technology users are informed of changes to the region at the next available opportunity. Announces live message:"Error {n} out of {n}", while navigating between the errors using buttons. |
| CHECK IF NEEDED `BulkTextarea.ErrorItem` | `aria-hidden="true"` | Hides noninteractive icon from the assistive technologies. |

### Keyboard support

See detailed information about the keyboard support for the Input in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#input_i_textarea).

## Considerations for developers and designers

- Keep it simple - not all browsers correctly expose multiple labels that are linked to the same form element.
- **CHECK THIS, maybe it works out of the box** Use labels for every input and make the `for=""` and `id=""` values match. IDs must be unique on each page, only one label can be associated to each unique form element. Make required fields obvious by using an indicator – asterisk, description text, etc.
 - **CHECK THIS** Fields with error validation should have `aria-describedby` to insure that the associated field level error message is read by assistive technology. If the error message has an `id="my-error-message"`, then the input should have `aria-describedby="my-error-message"`.

 ### Error messages

 Set error messages for the tooltips that will be shown for siighted users and read by assistive technologies. You should set:

- Messages for the specific errors in the invalid lines based on your validation rules
- Message for the whole invalid input

**These messages aren't set by default in the component.**

## Resources

- [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-text-fields) describes core principles for the accessible inputs and textarea.
- Find live examples of accessible inputs with different types in [DigitalA11y project](https://www.digitala11y.com/demos/accessibility-of-html-input-types-examples/).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
