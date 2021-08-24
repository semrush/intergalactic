---
title: A11y
---

@## Keyboard support

| Key                   | Function                         |
| --------------------- | -------------------------------- |
| `Right`, `Up` arrows  | Increases slider value one step. |
| `Left`, `Down` arrows | Decreases slider value one step. |

@## Roles & attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in your interfaces.

| Role   | Attribute                 | Element | Usage                                                                                                                                                          |
| ------ | ------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| slider |                           | `div`   | Identifies the element as a slider. Set on the `div` that represents as the movable thumb because it is the operable element that represents the slider value. |
|        | `tabindex="0"`            | `div`   | Includes the slider thumb in the page `tab` sequence.                                                                                                          |
|        | `aria-valuemax="255"`     | `div`   | Specifies the maximum value of the slider.                                                                                                                     |
|        | `aria-valuemin="0"`       | `div`   | Specifies the minimum value of the slider.                                                                                                                     |
|        | `aria-valuenow="NUMBER"`  | `div`   | Indicates the current value of the slider.                                                                                                                     |
|        | `aria-labelledby="IDREF"` | `div`   | Refers to the element containing the name of the slider.                                                                                                       |

@## Resources

[W3 slider example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/slider/slider-1.html) has detailed information about the slider accessible behavior.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
