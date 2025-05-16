---
title: Slider
fileSource: slider
a11y: AA
tabs: Design('slider'), A11y('slider-a11y'), API('slider-api'), Example('slider-code'), Changelog('slider-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                   | Function                                                |
| --------------------- | ------------------------------------------------------- |
| `Tab` | Moves focus to the slider.                              |
| `Right Arrow` , `Up Arrow` | Increases slider value one step.                  |
| `Left Arrow` , `Down Arrow` | Decreases slider value one step.                   |
| `Home` | Set the slider to the first allowed value in its range. |
| `End` | Set the slider to the last allowed value in its range.  |

### Roles and attributes

The following list describes roles and attributes that component already has.

Table: Roles and attributes

| Role     | Attribute                 | Element | Usage                                                                                                                                                          |
| -------- | ------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `slider` |                           | `div` | Identifies the element as a slider. Set on the `div` that represents as the movable thumb because it is the operable element that represents the slider value. |
|          | `tabIndex="0"` | `div` | Includes the slider thumb in the page `tab` sequence.                                                                                                          |
|          | `aria-valuemax="255"` | `div` | Specifies the maximum value of the slider.                                                                                                                     |
|          | `aria-valuemin="0"` | `div` | Specifies the minimum value of the slider.                                                                                                                     |
|          | `aria-valuenow="NUMBER"` | `div` | Indicates the current value of the slider.                                                                                                                     |
|          | `aria-valuetext="string"` | `div` | Defines the human readable text alternative of `aria-valuenow` for a range widget.                                                                             |
|          | `aria-labelledby="IDREF"` | `div` | Refers to the element containing the name of the slider.                                                                                                       |
|          | `aria-orientation` | `div` | Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.                                                                     |

## Resources

* [W3 slider documentation](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) has information about the slider accessible behavior and its different versions.
* Find live examples of accessible inputs with different types in [DigitalA11y project](https://www.digitala11y.com/demos/accessibility-of-html-input-types-examples/).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
