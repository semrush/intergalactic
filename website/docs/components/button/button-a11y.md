---
title: A11y
---

> ### General recommendations
>
> - A `<button>` tag does not need anything special to work. Use `<button>` when you can, but it is possible to use other elements as long as you add role="button" and add JavaScript to replicate the button functionality.
> - Just like links, you can add `class="visuallyhidden"` with descriptive text to give more context to the button's purpose.
> - If a button contains an `<img>` element, make sure to set its alt attribute. If it contains an icon, use aria-label to describe the icon instead.
> - You can use `<input type="image">` to make a graphical button. It takes a `src` and `alt` attribute just like traditional images.
> - Button states are important, not just button styling! If you are only toggling classes to visually manage state of your components, you are likely not appropriately conveying that state to users of assistive technologies.
>
> [A11y style guide](https://a11y-style-guide.com/style-guide/section-general.html)

@## Keyboard support

| Key              | Function              |
| ---------------- | --------------------- |
| `Space`, `Enter` | Activates the button. |

@## Roles & attributes

| Role   | Attribute              | Element    | Usage                                                                                                                    |
| ------ | ---------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| button |                        | `div`, `a` | Identifies the element as a button widget. Accessible name for the button is defined by the text content of the element. |
|        | `tabindex="0"`         | `div`, `a` | Includes the element in the `Tab` sequence. Needed on the `a` element because it does not have a `href` attribute.       |
|        | `aria-pressed="false"` | `a`        | Identifies the button as a toggle button. Indicates the toggle button is not pressed.                                    |
|        | `aria-pressed="true"`  | `a`        | Identifies the button as a toggle button. Indicates the toggle button is pressed.                                        |

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).

@## Resources

- [W3 button examples](https://www.w3.org/TR/wai-aria-practices-1.1/examples/button/button.html) has detailed information about the accordion accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-general.html) gives core recommendations for the accessible components.
