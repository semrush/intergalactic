---
title: A11y
a11y: AA
---

Counter component doesn't require any special accessibility considerations, but make sure to include it in the reading order so screen readers can access it. Since it's not interactive, it doesn't need to be in the focus (tab) order.

Avoid the use of aria-labels on `span` elements.

## Considerations for designers

- Counter text should be clear and concise.
- Make sure to [check the contrast of the counter text against the background](/core-principles/a11y/a11y-design/#color_and_contrast).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/#contrast).
