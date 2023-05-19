---
title: A11y
fileSource: tag
a11y: AA
---

## What component has

### Keyboard support

| Key           | Function                                                                          |
| ------------- | --------------------------------------------------------------------------------- |
| `Tab`         | Moves keyboard focus to the interactive tag and its `Close` icon button.          |
| `Shift + Tab` | Moves focus to the previous focusable element.                                    |
| `Enter`       | Toggles `active` state for interactive tag or removes tag by `Close` icon button. |

## Considerations for developers

- Make sure screenreader reads your tags list as a group.
- Tags that are used as a link for filtering content should also follow the accessibility guidelines for [Link](/components/link/link-a11y/).
- Make sure that any function accessible by hovering with a mouse is also available using only the keyboard.

## Considerations for designers

- Tag text should be clear and concise.
- Make sure to [check the contrast of the tag text against the background](/core-principles/a11y/a11y-design/#color_and_contrast).
- Tag that is used as a link for filtering content should also follow the accessibility guidelines for [Link](/components/link/link-a11y/).

## Resources

To find more information on the ways to make your tags accessible by the keyboard and screen readers see [Creating accessible tag](https://a11y-guidelines.orange.com/en/web/components-examples/tags/).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/#contrast).
