---
title: A11y
fileSource: tag
---

@## What component has

### Keyboard support

| Key     | Function                                                                        |
| ------- | ------------------------------------------------------------------------------- |
| `Tab`   | Moves keyboard focus to the interactive tag and its Close icon button.          |
| `Enter` | Toggles `active` state for interactive tag or removes tag by Close icon button. |

@## Considerations for developers

- Make sure screenreader reads your tags list as a group.
- Tags that are used as a link for filtering content should also follow the accessibility guidlines for [Link](/components/link/link-a11y/).

@## Considerations for designers

- Tag text should be clear and concise.
- Make sure to [check the contrast of the tag text against the background](/style/palette/palette-a11y/).
- Tag that is used as a link for filtering content should also follow the accessibility guidlines for [Link](/components/link/link-a11y/).

@## Resources

To find more information on the ways to make your tags accessible by the keyboard and screen readers see [Creating accessible tag](https://a11y-guidelines.orange.com/en/web/components-examples/tags/).

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/#contrast).
