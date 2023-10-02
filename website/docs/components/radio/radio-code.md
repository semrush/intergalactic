---
title: Example
fileSource: radio
---

@## RadioGroup example

RadioGroup acts as a controlling component and doesn't have an actual HTML element beneath it.

@example group

@## Additional props for input

Radio.Value conceals a stylistic div and a real, hidden input. When you pass props to Radio.Value, it passes specific set of them to input props and all others goes to check-mark div.

If you need more control over input-tag, you can pass props to Radio.Value.Control.

> 🚨 `Radio.Value.RadioMark` should always be the next element after `Radio.Value.Control` in DOM.

@example include
