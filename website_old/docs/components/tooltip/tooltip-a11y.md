---
title: A11y
---

> ### General recommendations
>
> - Tooltips should not receive focus. The focus should remain on the field, button, or link the tooltip is about.
> - Tooltips should not be revealed until a short time has passed (~1-5 seconds).
> - Depending on the tooltip option you choose, there may be additional ARIA tags you should apply. Add `aria-describedby="example1"` on an input field and link it to a related section with a matching ID selector `id="example1"`.
> - Whenever possible, use descriptive text on your form fields that does need to be activated by a focus or hover event. Tooltips can be problematic for some assistive technologies (AT) devices.
>
> [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-tooltips)

@## Resources

[A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-tooltips) describes core principles for the accessible inputs and textarea.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
