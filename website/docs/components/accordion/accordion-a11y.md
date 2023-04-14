---
title: A11y
a11y: AA
---

@## What component has

### Keyboard support

| Key              | Function                                                                           |
| ---------------- | ---------------------------------------------------------------------------------- |
| `Tab`            | Moves focus to the next focusable element.                                         |
| `Shift + Tab`    | Moves focus to the previous focusable element.                                     |
| `Space`, `Enter` | When focus is on the accordion header of a collapsed section, expands the section. |

### Roles and attributes

The list below describes roles and attributes that component already has.

| Role     | Attribute                 | Element  | Usage                                                                                                                                                                                                                       |
| -------- | ------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `region` |                           | `div`    | Creates a landmark region that contains the currently expanded accordion panel.                                                                                                                                             |
| `button` |                           | `div`, `button` | The `button` role is for clickable elements that trigger a response when activated by the user. Adding `role="button"` tells the screen reader the element is a button, but provides no button functionality.               |
|          | `aria-expanded="true"`    | `button` | Set to `true` when the Accordion panel is expanded, otherwise set to `false`.                                                                                                                                               |
|          | `aria-controls="ID"`      | `button` | Points to the `ID` of the panel which the header controls.                                                                                                                                                                  |
|          | `aria-labelledby="IDREF"` | `div`    | Defines the accessible name for the region element. References the accordion header button that expands and collapses the region. `region` elements are required to have an accessible name to be identified as a landmark. |
|          | `aria-disabled`             |          | The `aria-disabled` state indicates that the element is perceivable but disabled, so it is not editable or otherwise operable. |

@## Considerations for developers

- Buttons are used as the accordions so that they are tab-able by keyboard users and accessible to screen readers.
- The accordion button should have an aria-controls attribute set to the `ID` of the element containing the accordion panel content.
- Each button has an aria-expanded attribute on it that is toggled between `true` and `false`. If `aria-expanded="true"`, the content associated with it is shown, and if `aria-expanded="false"` the content is hidden.

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-navigation.html).

@## Resources

- [W3 accordion example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html) has detailed information about the accordion accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-navigation.html) gives recommendations for the accessible components.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
