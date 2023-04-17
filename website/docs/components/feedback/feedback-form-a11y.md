---
title: A11y
a11y: AA
---

@## What pattern has

Feedback pattern consists of several components that have their own accessibility requirements. You can find more about each of them in their guides:

- [Notice](/components/notice/notice-a11y)
- [Button](/components/button/button-a11y)
- [Typography](/style/typography/typography-a11y)
- [Dropdown](/components/dropdown/dropdown-a11y)
- [Textarea](/components/textarea/textarea-a11y)
- [Input](/components/input/input-a11y)
- [Link](/components/link/link-a11y)
- [Checkbox](/components/checkbox/checkbox-a11y)
- [Radio](/components/radio/radio-a11y)
- [Select](/components/select/select-a11y)

@## Considerations for developers

- Use the `label` element, and, in specific cases, other mechanisms (e.g. WAI-ARIA, title attribute etc.), to identify each form control.
- Use the `fieldset` and `legend` elements to group and associate related form controls.
- Validate input provided by the user and provide options to undo changes and confirm data entry.

See [Forms Tutorial from W3](https://www.w3.org/WAI/tutorials/forms/) for the detailed information and links.

### Keyboard support

See detailed information about the keyboard support for the all form elements in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard/).

@## Considerations for designers

- Provide instructions to help users understand how to complete the form and individual form controls.
- Notify users about successful task completion, any errors, and provide instructions to help them correct mistakes.
- Divide long forms into multiple smaller forms that constitute a series of logical steps or stages and inform users about their progress.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
