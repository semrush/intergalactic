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

### Roles & attributes

The list below describes roles and attributes that component already has.

| Component      | Role     | Attribute                   | Usage                                      |
| -------------- | -------- | --------------------------- | ------------------------------------------ |
| `Switch.Value` | `switch` | `aria-checked="true/false"` | Indicates whether the switch is on or off. |

## Considerations for designers

- Make sure to add a non-color visual cue, like on-screen text or icon inside the `Switch.Value`, to convey the state of the switch. This will ensure that the meaning is clear to all users, including those who may have difficulty distinguishing colors.
- If changing the state of a switch causes an instant change, it may violate a guideline called [WCAG Success Criterion 3.2.2 On Input](https://www.w3.org/WAI/WCAG21/Understanding/on-input.html). To avoid this, either make sure the change doesn't automatically cause a [change of context](https://www.w3.org/WAI/WCAG21/Understanding/on-input.html#dfn-changes-of-context), or inform users about the behavior before they use the switch.

## Considerations for developers

You can add an external label to the Switch, just make sure the label and `Switch.Value` are connected through `id`. Refer to [External label exmaple](/components/switch/switch-code#outer-label).

<!-- ### Roles and attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Attributes

| Component      | Attribute | Usage                |
| -------------- | --------- | -------------------- |
| `Switch.Addon` | `aria-hidden="true"` | Removes the text labels that appear next to the switch from the accessible name of the switch. This helps to prevent redundant announcement of the state by screen readers. | -->

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).

<!--@include: ./switch-a11y-report.md-->
