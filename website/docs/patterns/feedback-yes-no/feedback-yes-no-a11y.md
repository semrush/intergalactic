---
title: FeedbackYesNo
tabs: Design('feedback-yes-no'), A11y('feedback-yes-no-a11y'), Example('feedback-yes-no-code')
---

## What component has

### Keyboard support

Find detailed information about the keyboard support for all form elements in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard).

### Roles and attributes

FeedbackYesNo form pattern consists of several components that have their own accessibility requirements. You can find more about each of them in their guides:

- [Notice](/components/notice/notice-a11y)
- [Button](/components/button/button-a11y)
- [Dropdown](/components/dropdown/dropdown-a11y)
- [Feedback form](/components/feedback-form/feedback-form-a11y)
- [Typography](/style/typography/typography-a11y)

## Considerations for developers

Ensure that the browser's autofill feature works correctly for the email input. Usually, this is achieved by setting `type="email"`, `autocomplete="email"`, and `id` or `name="email"` attributes, [as in the example](./feedback-yes-no-code.md).

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).
