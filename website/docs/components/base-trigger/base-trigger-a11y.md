---
title: BaseTrigger
a11y: AA
tabs: Design('base-trigger'), A11y('base-trigger-a11y'), API('base-trigger-api'), Example('base-trigger-code'), Changelog('base-trigger-changelog')
---

## What component has

### Keyboard support

`FilterTrigger` keyboard support is described in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#any-other-controls-filtertrigger-pills-tabline-etc).

### Roles & attributes

The following table describes roles and attributes that component already has.

Table: Roles & attributes

| Component          | Attribute                  | Usage                                                                         |
| ------------------ | -------------------------- | ----------------------------------------------------------------------------- |
| `Trigger.Text`     | `aria-hidden="true"`       | **Only when the value is empty**. Hides the placeholder text from assistive technology. Helps to avoid reading the trigger name twice when it's identical to the placeholder. |

## Considerations for developers

Make sure to label triggers by using either `<label>`, `aria-labelledby`, or `aria-label`. Refer to [our examples](./base-trigger-code.md#linktrigger).

For more accessibility recommendations, refer to guidelines for components that are normally used with `BaseTrigger` and its variations:

* [FilterTrigger](../filter-trigger/filter-trigger-a11y.md)
* [Select](../select/select-a11y.md)
* [Dropdown](../dropdown/dropdown-a11y.md)
* [DropdownMenu](../dropdown-menu/dropdown-menu-a11y.md)

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).
