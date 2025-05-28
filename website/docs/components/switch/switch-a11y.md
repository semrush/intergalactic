---
title: Switch
fileSource: switch
a11y: AA
tabs: Design('switch'), A11y('switch-a11y'), API('switch-api'), Example('switch-code'), Changelog('switch-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key               | Function                                               |
| ----------------- | ------------------------------------------------------ |
| `Space` , `Enter` | Changes state of the switch to checked or not checked. |

## Considerations for designers

- Make sure to add a non-color visual cue, like on-screen text or icon inside the `Switch.Value`, to convey the state of the switch. This will ensure that the meaning is clear to all users, including those who may have difficulty distinguishing colors. Refer to [Visual clue example](/components/switch/switch-code#visual-clue).
- If changing the state of a switch causes an instant change, it may violate a guideline called [WCAG Success Criterion 3.2.2 On Input](https://www.w3.org/WAI/WCAG21/Understanding/on-input.html). To avoid this, either make sure the change doesn't automatically cause a [change of context](https://www.w3.org/WAI/WCAG21/Understanding/on-input.html#dfn-changes-of-context), or inform users about the behavior before they use the switch.

## Considerations for developers

You can add an external label to the Switch, just make sure the label and `Switch.Value` are connected through `id`. Refer to the [External label exmaple](/components/switch/switch-code#external-label).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
