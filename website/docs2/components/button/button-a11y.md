---
title: Button
a11y: AA
tabs: Design('button'), A11y('button-a11y'), API('button-api'), Example('button-code'), Changelog('button-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key              | Function                                       |
| ---------------- | ---------------------------------------------- |
| `Tab`            | Moves focus to the next focusable element.     |
| `Shift + Tab`    | Moves focus to the previous focusable element. |
| `Enter`, `Space` | Activates the button.                          |

### Roles & attributes

The list below describes roles and attributes that component already has.

Table: Roles and attributes

| Role     | Attribute              | Element    | Usage                                                                                                                                       |
| -------- | ---------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `button` |                        | `div`, `a` | Identifies the element as a button. Accessible name for the button is defined by the text content of the element or by adding `aria-label`. |
|          | `tabIndex="0"`         | `div`, `a` | Includes the element in the `Tab` sequence. Needed on the `a` element because it doesn't have a `href` attribute.                          |
|          | `aria-pressed="false"` | `a`        | Identifies the button as a toggle button. Indicates the toggle button isn’t pressed.                                                       |
|          | `aria-pressed="true"`  | `a`        | Identifies the button as a toggle button. Indicates the toggle button is pressed.                                                           |

## Considerations for developers

- A `<button>` tag doesn't need anything special to work. Use `<button>` when you can, but it is possible to use other elements as long as you add role="button" and add JavaScript to replicate the button functionality.
- Ensure visual labels and programmatic labels match.
- Just like links, you can add `class="visuallyhidden"` with descriptive text to give more context to the button's purpose.
- Usually, SVG icons should be hidden from screen readers on a button that has a text label.
- You can use `<input type="image">` to make a graphical button. It takes a `src` and `alt` attribute just like traditional images.
- Button states are important, not just button styling! If you are only toggling classes to visually manage state of your components, you are likely not appropriately conveying that state to users of assistive technologies.
- If there is no text in the button, it is necessary to add aria-label with a button description.

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-general.html).

### Roles and attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Attributes

| Attribute         | Element | Usage                                                                                                                                                                 |
| ----------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-label`      | `div`   | Defines a string value that labels an interactive element. It is a required for buttons without text content.                                                     |
| `aria-labelledby` | `div`   | The `aria-labelledby` attribute identifies the element (or elements) that labels the element it is applied to. It is a required for buttons without text content. |

## Resources

- [W3 button examples](https://www.w3.org/TR/wai-aria-practices-1.1/examples/button/button.html) has detailed information about the button accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-general.html) gives recommendations for the accessible components.
- Find live examples of accessible inputs with different types in [DigitalA11y project](https://www.digitala11y.com/demos/accessibility-of-html-input-types-examples/).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
