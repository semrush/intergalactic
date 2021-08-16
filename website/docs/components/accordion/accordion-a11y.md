---
title: A11y
---

@## Accessibility recommendations

- The user should be able to open/close the accordion section using the keyboard.
- All focusable elements in the accordion must be included in the page `Tab` sequence.

@## Keyboard support

| Key              | Function                                                                           |
| ---------------- | ---------------------------------------------------------------------------------- |
| `Space`, `Enter` | When focus is on the accordion header of a collapsed section, expands the section. |
| `Tab`            | Moves focus to the next focusable element.                                         |
| `Shift + Tab`    | Moves focus to the previous focusable element.                                     |

@## Roles & attributes

| Role   | Attribute                 | Element  | Usage                                                                                                                                                                                                                       |
| ------ | ------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|        |                           | `h`      | Element that serves as an accordion header.                                                                                                                                                                                 |
|        | `aria-expanded="true"`    | `button` | Set to `true` when the Accordion panel is expanded, otherwise set to `false`.                                                                                                                                               |
|        | `aria-controls="ID"`      | `button` | Points to the `ID` of the panel which the header controls.                                                                                                                                                                  |
| region |                           | `div`    | Creates a landmark region that contains the currently expanded accordion panel.                                                                                                                                             |
|        | `aria-labelledby="IDREF"` | `div`    | Defines the accessible name for the region element. References the accordion header button that expands and collapses the region. `region` elements are required to have an accessible name to be identified as a landmark. |

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).

@## Resources

[W3 accordion example and documentation](https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html) has detailed information about the accordion accessible behavior.
