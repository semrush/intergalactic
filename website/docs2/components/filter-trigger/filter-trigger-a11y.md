---
title: A11y
a11y: AA
---

## What component has

### Keyboard support

See detailed information about the keyboard support for the FilterTrigger in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard/#any_other_controls_filtertrigger_pills_tabline_i_pr).

### Roles and attributes

The list below describes roles and attributes that component already has.

| Role     | Attribute    | Element         | Usage                                                                                                             |
| -------- | ------------ | --------------- | ----------------------------------------------------------------------------------------------------------------- |
| `button` |              | `button`        | Identifies the element as a button. Accessible name for the button is defined by the text content of the element. |
| `group`  |              | `div`           | Identifies the `div` element as a group container for the buttons.                                                |
|          | `aria-label` | `div`, `button` | The `aria-label` attribute defines a string value that labels an interactive element.                             |

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).

@include filter-trigger-a11y-report
