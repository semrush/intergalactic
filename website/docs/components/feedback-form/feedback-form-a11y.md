---
title: Feedback
a11y: AA
tabs: Design('feedback-form'), A11y('feedback-form-a11y'), API('feedback-form-api'), Example('feedback-form-code'), Changelog('feedback-form-changelog')
---

## What pattern has

Feedback pattern consists of several components that have their own accessibility requirements. You can find more about each of them in their guides:

- [Button](/components/button/button-a11y)
- [Checkbox](/components/checkbox/checkbox-a11y)
- [Dropdown](/components/dropdown/dropdown-a11y)
- [Input](/components/input/input-a11y)
- [Link component](/components/link/link-a11y)
- [Notice](/components/notice/notice-a11y)
- [Radio](/components/radio/radio-a11y)
- [Select](/components/select/select-a11y)
- [Textarea](/components/textarea/textarea-a11y)
- [Typography](/style/typography/typography-a11y)

## Considerations for developers

- Use the `label` element, and, in specific cases, other mechanisms (for example, title attribute, etc.), to identify each form control.
- Use the `fieldset` and `legend` elements to group and associate related form controls.
- Ensure that the browser's autofill feature works correctly for the email input. Usually, this is achieved by setting `type="email"`, `autocomplete="email"`, and `id` or `name="email"` attributes, [as in the example](./feedback-form-code.md).

Read [Forms Tutorial from W3](https://www.w3.org/WAI/tutorials/forms/) for the detailed information and links.

<!-- ### Keyboard support

See detailed information about the keyboard support for the all form elements in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard). -->

## Considerations for designers

- Provide instructions to help users understand how to complete the form and individual form controls.
- Notify users about successful task completion, any errors, and provide instructions to help them correct mistakes.
- Divide long forms into multiple smaller forms that constitute a series of logical steps or stages and inform users about their progress.

## Other recommendations

Find more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
