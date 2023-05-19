---
title: A11y
a11y: AA
---

## What component has

### Roles and attributes

The list below describes roles and attributes that component already has.

| Role    | Attribute            | Element           | Usage                                                                                                                                                                                                            |
| ------- | -------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alert` |                      | `div`             | Identifies the element as the container where alert content will be added or updated.                                                                                                                            |
|         | `aria-live="polite"` | Implicit on `div` | Any region which receives updates that are important for the user to receive, but not so rapid as to be annoying, should receive this attribute. The screen reader will speak changes whenever the user is idle. |

## Considerations for developers

Don't forget to add `aria-label` for this element so it can be read by assistive technologies.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
