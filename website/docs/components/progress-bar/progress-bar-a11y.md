---
title: A11y
a11y: AA
---

## What component has

### Roles and attributes

The list below describes roles and attributes that component already has.

| Role          | Attribute                | Element | Usage                                                                                 |
| ------------- | ------------------------ | ------- | ------------------------------------------------------------------------------------- |
| `progressbar` |                          | `div`   | Defines an element that displays the progress status for tasks that take a long time. |
|               | `aria-valuenow="NUMBER"` | `div`   | Defines the current value for a range widget.                                         |

## Considerations for developers

You can find best practices and tips in [ARIA: progressbar role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role).

### Roles and attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

| Attribute                         | Element | Usage                                                                                                                                                                                                                                                                |
| --------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-valuetext="string"`         | `div`   | Defines the human readable text alternative of `aria-valuenow` for a range widget. Assistive technologies often present the value of `aria-valuenow` as a percentage. If this would not be accurate use this property to make the progress bar value understandable. |
| `aria-valuemin`                   | text    | Defines the minimum allowed value for a range widget. Set to a decimal value representing the minimum value, and less than `aria-valuemax`. If not present, the default value is 0.                                                                                  |
| `aria-valuemax`                   | text    | Defines the maximum allowed value for a range widget. Set to a decimal value representing the maximum value, and greater than `aria-valuemin`. If not present, the default value is 100.                                                                             |
| `aria-label` or `aria-labelledby` | `div`   | Defines the string value or identifies the element (or elements) that label the `progressbar` element providing an accessible name. An accessible name is required.                                                                                                  |

## Resources

Find live examples of accessible inputs with different types in [DigitalA11y project](https://www.digitala11y.com/demos/accessibility-of-html-input-types-examples/).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
