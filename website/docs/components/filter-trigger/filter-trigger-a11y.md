---
title: FilterTrigger
a11y: AA
tabs: Design('filter-trigger'), A11y('filter-trigger-a11y'), API('filter-trigger-api'), Example('filter-trigger-code'), Changelog('filter-trigger-changelog')
---

## What component has

### Keyboard support

Read more about `FilterTrigger` keyboard support in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#any-other-controls-filtertrigger-pills-tabline-etc).

### Roles and attributes

The following table describes roles and attributes that component already has.

| Component                   | Attribute            | Usage                                                                                                             |
| --------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `FilterTrigger.ClearButton` | `aria-label="Clear"` | Defines an accessible name for the **Clear** button. |

For other roles and attributes, refer to documentation for components that are commonly used with `FilterTrigger`:

* [Select](../select/select-a11y.md)
* [Dropdown](../dropdown/dropdown-a11y.md)

## Considerations for developers

* Make sure your `FilterTrigger` has an accessible name by using a `<label>` element, `aria-labelledby` or `aria-label`. Refer to [our examples](filter-trigger-code.md).
* If the filter name is displayed in the trigger alongside the value, hide it from the assistive technology to avoid double reading. Refer to the [accessible name example](./filter-trigger-code.md#accessible-name).

## Other recommendations

For more accessibility recommendations, read the common [Accessibility guide](/core-principles/a11y/a11y).

<!--@include: ./filter-trigger-a11y-report.md-->
