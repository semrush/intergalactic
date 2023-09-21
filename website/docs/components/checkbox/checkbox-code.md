---
title: Example
---

@## Partial selection

Make sure to follow the guide's instructions on checkbox spacing.

@example indeterminate

@## Checkbox with other components

@example withIconAndLink

@## Additional props for input

`Checkbox.Value` is made of a check-mark div and a hidden input-tag. When you pass props to Checkbox.Value, it passes specific set of them to input props and all others goes to check-mark div.
If you need more control over input-tag, you can pass props to Checkbox.Value.Control.

> 🚨 `Checkbox.Value.CheckMark` should always be the next element after `Checkbox.Value.Control` in DOM.

@example advanced