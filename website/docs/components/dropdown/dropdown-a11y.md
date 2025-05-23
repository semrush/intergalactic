---
title: Dropdown
fileSource: dropdown
a11y: AA
tabs: Design('dropdown'), A11y('dropdown-a11y'), API('dropdown-api'), Example('dropdown-code'), Changelog('dropdown-changelog')
---

## What component has

When dropdown is closed, the focus returns to the trigger.

### Keyboard support

Table: Keyboard support

| Key              | Function                                       |
| ---------------- | ---------------------------------------------- |
| `Tab`, <nobr>`Shift + Tab`</nobr> | Moves focus cyclically through all focusable elements in the dropdown, including the dropdown container.     |
| `Space` , `Enter` | **On the trigger:** opens the dropdown.      |
| `Esc` | Closes the dropdown.                           |

<!-- See detailed information for the controlling dropdown with the keyboard in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#keyboard-support-for-popper). -->

### Roles & attributes

The following list describes roles and attributes that component already has.

Table: Default roles and attributes

| Component            | Attribute                  | Usage                                                                     |
| -------------------- | -------------------------- | ------------------------------------------------------------------------- |
| `Dropdown.Trigger`   | `role="button"`            | Ideintifies the element as a clickable button. |
| `Dropdown.Trigger`   | `aria-haspopup="dialog"`   | Indicates that the element triggers a dialog. |
| `Dropdown.Trigger`   | `aria-controls="IDREF"`    | Identifies the element that serves as the dropdown popper. |
| `Dropdown.Trigger`   | `aria-expanded="true"` or `"false"` | Indicates whether the dropdown is open. |
| `Dropdown.Popper`    | `role="dialog"`            | Identifies the element as a dialog, indicating that its content is grouped and separated from the rest of the page content. |

## Considerations for developers

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in your interfaces.

Table: Recommended roles and attributes

| Component            | Attribute                  | Usage                                                                  |
| -------------------- | -------------------------- | ---------------------------------------------------------------------- |
| `Dropdown.Popper`    | `aria-label` or `aria-labelledby` | Defines an accessible name for the dropdown popper. We recommend using `aria-labelledby` connected to the dropdown trigger, as shown in the [example](./dropdown-code#basic-usage). |

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).