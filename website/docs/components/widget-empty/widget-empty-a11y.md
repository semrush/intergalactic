---
title: Widget empty state
fileSource: time-picker
a11y: AA
tabs: Design('widget-empty'), A11y('widget-empty-a11y'), API('widget-empty-api'), Example('widget-empty-code'), Changelog('widget-empty-changelog')
---

## What component has

### Roles and attributes

The following list describes roles and attributes that component already has.

Table: Roles and attributes

| Component / element | Role | Attribute   | Description |
| ------------------- | -------------- | --------------------------------------------------------- | ----------- |
| `WidgetEmpty` | `status`       | implicit `aria-live="polite"` and ` aria-atomic="true"`   | Any region which receives updates that are important for the user to receive, but not so rapid as to be annoying, should receive `aria-live="polite"` attribute. The screen reader will speak changes whenever the user is idle. |
| `Image`       |                | `aria-hidden='true'`                                      | Removes the image from the accessibility tree.  |
| `img`         |          | `alt=''` | Decorative images do not need to be announced by the screen reader, so the `alt` attribute should be empty. |

## Considerations for designers

Make sure that the user can easily read the text of the message. Check recommendations in [Typography](/style/typography/typography-a11y#considerations-for-designers).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
