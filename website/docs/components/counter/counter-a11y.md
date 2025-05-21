---
title: Counter
a11y: AA
tabs: Design('counter'), A11y('counter-a11y'), API('counter-api'), Example('counter-code'), Changelog('counter-changelog')
---

## Considerations for designers & developers

- Counter text should be clear and concise.
- If you're using `Counter` on a colored or dark background, make sure that [it has enough contrast against the background](/core-principles/a11y/a11y-design#color-and-contrast).
- Include counters in the reading order so screen readers can access it.
- Counters aren't interactive, so they don't have to be in the keyboard focus (tab) order.
- You can use `ScreenReaderOnly` component for screen readers to announce counter value along with some accompanying text. [Refer to the example](./counter-code#counter-in-forms) for more details.
- Avoid using `aria-label` and `aria-labelledby` attributes on noninteractive text, that is, on `span` and `div` elements without an interactive role.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
