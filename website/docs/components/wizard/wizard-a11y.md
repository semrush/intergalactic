---
title: Wizard
a11y: AA
tabs: Design('wizard'), A11y('wizard-a11y'), API('wizard-api'), Example('wizard-code'), Changelog('wizard-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                               | Function                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------- |
| `Tab`, <nobr>`Shift + Tab`</nobr> | Moves focus to the next (or previous) focusable element.                        |
| `Up Arrow`, <nobr>`Down Arrow`</nobr> | If a `Stepper` is focused, selects the previous (or next) `Stepper`.        |
| `Enter`, `Space`                  | If a `Stepper` is selected, activates it and switches to the corresponding step. |
| `Esc`                             | Closes the wizard.                                                              |

See detailed information about the keyboard support for the all form elements in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard).

### Roles and attributes

The following list describes roles and attributes that component already has.

Table: Roles and attributes

| Component         | Attribute                             | Usage                                                                                                                                     |
| ----------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `Wizard`          | `aria-labelledby="IDREF"`             | Defines an accessible name for the dialog. Automatically populated from the title in the `Wizard.Sidebar`. |
|                   | `role="dialog"`, `aria-modal="true"`  | Identifies the element as a modal dialog. Inherited from [Modal](../modal/modal-a11y). |
| `Modal.Close`     | `aria-label="Close"`                  | Defines an accessible name for the **Close** button. Inherited from [Modal](../modal/modal-a11y). |
| <nobr>`Wizard.Sidebar > div`</nobr> | `role="tablist"`    | Identifies the element as a set of tabs. |
|                   | `aria-orientation="vertical"`  | Indicates that the orientation of the tablist is vertical, helping to use the appropriate keys for navigation. |
| `Wizard.Stepper`  | `role="tab"`                          | Identifies the element as a tab. |
|                   | `aria-selected="true/false"`          | Indicates whether the tab is active. |
|                   | `aria-controls="IDREF"`               | Refers to the content area that corresponds to this tab. |
| `Wizard.Content`  | `role="tabpanel"`                     | Identifies the element as a content area associated with a tab. |
|                   | `aria-labelledby="IDREF"`             | Defines an accessible name for the content area by referring to the corresponding tab. |
| `Wizard.StepBack` | `aria-label="Back to {Step}"`         | Defines an accessible name for the button that goes to the previous step. |
| `Wizard.StepNext` | `aria-label="Go to {Step}"`           | Defines an accessible name for the button that goes to the next step. |

## Considerations for developers

Ensure the proper heading hierarchy in the `Wizard`. The `Wizard` starts with an `h2` heading by default, so each step should start with an `h3` heading, and so on. Refer to the [example](./wizard-code#basic-usage) for details.

## Resources

- [W3 modal dialog example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html) has detailed information about the modal window accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html) describes accessible behavior of all form elements.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
