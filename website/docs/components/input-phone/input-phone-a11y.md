---
title: InputPhone
a11y: AA
tabs: Design('input-phone'), A11y('input-phone-a11y'), Example('input-phone-code'), Changelog('input-phone-changelog')
---

This pattern is built with Input, InputMask and Select components. For the detailed documentation regarding accessibility, refer to their documentation:

- [Input](/components/input/input-a11y)
- [InputMask](/components/input-mask/input-mask-a11y)
- [Select](/components/select/select-a11y)

## Considerations for developers

Make sure the browser's autofill feature works correctly in phone inputs, and the appropriate virtual keyboard is displayed on focus. Usually, this is done by adding `type="tel"` and `autocomplete="tel"` attributes, as [in the examples](./input-phone-code.md).

## Other recommendations

Find more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
