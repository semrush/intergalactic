---
title: A11y
a11y: AA
---

## Considerations for developers

- Make sure you have tabbing focus indicators for all elements that should be controlled.
- Ensure all text within the card is in the reading order and accessible to screen reader users.
- If the image is meaningful and informational for the user, set the `alt` text as a descriptive alternative for the image.
- If the image is decorative, set `alt=""`, so it will be ignored by assistive technologies, such as screen readers.
- Avoid using generic strings like photo, image, or icon as `alt` values, as they don’t communicate valuable content to the user. Be as descriptive as possible.
- You can add `class="visuallyhidden"` with descriptive text to give more context to a button or link's purpose.

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-cards.html).

## Resources

[A11y style guide](https://a11y-style-guide.com/style-guide/section-cards.html) gives core recommendations for the accessible card components.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
