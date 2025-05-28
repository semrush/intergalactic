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

Sometimes, the filter name is included in the trigger alongside the value, for example "Color: Blue." In these cases, hide the name part from assistive technology to avoid redundant reading. Refer to the [accessible name example](./filter-trigger-code.md#accessible-name).

### Roles and attributes

The following table will help you to keep in mind the necessary attributes to make our components fully accessible in the particular cases in your interfaces.

| Component       | Attribute                                                  | Usage                                                        |
| --------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| `Trigger`       | `<label for="IDREF">` or `aria-labelledby="IDREF"` or `aria-label` | Defines an accessible name for the trigger. Refer to [our examples](filter-trigger-code.md). |
| `Select.Menu`   | `aria-labelledby="IDREF"` or `aria-label`                          | Due to system limitations, `<Select.Menu>` doesn't generate its accessible name automatically when used with `FilterTrigger`. Make sure to label it explicitly, as in [our examples](./filter-trigger-code.md). |

## Other recommendations

For more accessibility recommendations, read the common [Accessibility guide](/core-principles/a11y/a11y).