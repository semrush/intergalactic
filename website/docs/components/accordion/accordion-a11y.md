---
title: Accordion
a11y: AA
tabs: Design('accordion'), A11y('accordion-a11y'), API('accordion-api'), Example('accordion-code'), Changelog('accordion-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key              | Function                                                                           |
| ---------------- | ---------------------------------------------------------------------------------- |
| `Tab`            | Moves focus to the next focusable element.                                         |
| `Shift + Tab`    | Moves focus to the previous focusable element.                                     |
| `Enter`, `Space` | When focus is on the accordion header of a collapsed section, expands the section. |

### Roles and attributes

The following list describes roles and attributes that component already has.

Table: Roles and attributes

| Component / element           | Role & attributes         | Usage                                                                                                                                     |
| ----------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `Accordion.Item.ToggleButton` | `role="button"`           | Defines element as clickable and can be activated by user, and controls the visibility of accordion's content panel.                      |
|                               | `aria-expanded="true"`    | Set to `true` when the accordion panel is expanded, otherwise set to `false`.                                                             |
|                               | `aria-controls="IDREF"`      | Points to the `ID` of the panel which the toggle button controls.                                                                         |
| `Accordion.Item.Chevron`      | `aria-hidden="true"`      | Hides non-interactive icon from the assistive technologies.                                                                               |
| `Accordion.Item.Collapse`     | `region`                  | Creates a landmark region that contains the currently expanded accordion panel.                                                           |
|                               | `aria-labelledby="IDREF"` | Defines the accessible name for the `region` element. References the `Accordion.Item.ToggleButton` that expands and collapses the region. |

## Considerations for designers & developers

By default, `Accordion.Item.Toggle` is set to an `h3` heading level, but you can change it if needed. Refer to [our example](https://developer.semrush.com/intergalactic/components/accordion/accordion-code#heading-tag).

## Resources

- [W3 accordion example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html) has detailed information about the accordion accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-navigation.html) gives recommendations for the accessible components.

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).
