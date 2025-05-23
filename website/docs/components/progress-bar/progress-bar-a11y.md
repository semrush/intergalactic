---
title: ProgressBar
a11y: AA
tabs: Design('progress-bar'), A11y('progress-bar-a11y'), API('progress-bar-api'), Example('progress-bar-code'), Changelog('progress-bar-changelog')
---

## What component has

### Default roles and attributes

The following list describes roles and attributes that component already has.

| Attribute                | Usage                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------- |
| `role="progressbar"`     | Defines an element that displays the progress status for tasks that take a long time. |
| `aria-valuenow="NUMBER"` | Indicates the current progress value to assistive technologies. |

## Considerations for developers

### Recommended roles and attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

| Attribute                         | Usage                                                        |
| --------------------------------- | ------------------------------------------------------------ |
| `aria-label` or `aria-labelledby` | **Required.** Provides an accessible name for the `ProgressBar`. |
| `aria-valuetext="string"`         | Allows to represent the progress values in a convenient format, for example, announce absolute values beside percentages ([example](./progress-bar-code#basic-usage)). |
| `tabIndex="0"`                    | Includes the `ProgressBar` in the `Tab` sequence. Not mandatory, but can help enhance discoverability by making the element focusable. |

## Resources

- [Progressbar role (MDN)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role)
- [Progress indicator checklist (MagentaA11y)](https://www.magentaa11y.com/checklist-web/progress/)
- [Progressbar role (W3C recommendations)](https://www.w3.org/TR/wai-aria-1.2/#progressbar)

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
