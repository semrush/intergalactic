---
title: Notice
a11y: AA
tabs: Design('notice'), A11y('notice-a11y'), API('notice-api'), Example('notice-code'), Changelog('notice-changelog')
---

## What component has

### Keyboard support

See detailed information about the keyboard support for the all clickable elements in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard).

### Roles and attributes

The following list describes roles and attributes that component already has.

Table: Roles and attributes

| Component      | Attribute                          | Usage                                                                                     |
| -------------- | ---------------------------------- | ----------------------------------------------------------------------------------------- |
| `Notice`       | `role="region"`                    | Defines an ARIA landmark, allowing quick navigation to the element. Undefined for **muted** theme. |
|                | `aria-label`                       | Defines a default accessible name for the region: `"Notification"` for **info**, **success** and **warning** themes, and `"Critical notification"` for **danger** theme. |
| `Notice.Close` | `aria-label="Close notification"`  | Defines the default accessible name for the **Close** button. |

## Considerations for designers and developers

- Provide accessible names for notices that accurately convey their type and importance. Refer to [our examples](./notice-code.md).
- Avoid showing more than one `Notice` on the same page at once. If you absolutely have to do it, make sure they all have different accessible names so they can be easily distinguished when navigating the landmarks.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
