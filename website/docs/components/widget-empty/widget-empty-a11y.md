---
title: A11y
fileSource: time-picker
a11y: AA
---

@## What component has

### Roles and attributes

The list below describes roles and attributes that component already has.

| Attribute            | Element | Usage                                                                                                                        |
| -------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `aria-hidden="true"` | `img`   | Hides images from the assistive technologies, because this element is auxiliary and should not be played by a screen reader. |

@## Considerations for developers

### Roles and attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

| Attribute            | Element           | Usage                                                                                                                                                                                                            |
| -------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-live="polite"` | Implicit on `div` | Any region which receives updates that are important for the user to receive, but not so rapid as to be annoying, should receive this attribute. The screen reader will speak changes whenever the user is idle. |

@## Considerations for designers

Make sure that the user can easily read the text of the message. Check recommendations in [Typography](/style/typography/typography-a11y/#considerations_for_designers).

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
