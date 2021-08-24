---
title: A11y
---

> ### General recommendations
>
> The `<fieldset>` surrounds the entire grouping of checkboxes or radio buttons. The `<legend>` provides a description for the grouping.
> Some assistive technology reads the legend text for each fieldset, so it should be brief and descriptive. This helps someone using assistive technology to understand the question they are answering with the group of radio buttons.
>
> [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-radio-buttons)

@## Keyboard support

| Key                                  | Function                                                                                                                                                                                                                                              |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`                                | Moves focus to the checked `radio` button in the `radiogroup`. If a `radio` button is not checked, focus moves to the first `radio` button in the group.                                                                                              |
| `Shift + Tab`                        | Moves focus to the previous focusable element.                                                                                                                                                                                                        |
| `Space`                              | If the `radio` button with focus is not checked, changes the state to `checked`. Otherwise, does nothing. _Note: The state where a radio is not checked only occurs on page load._                                                                    |
| `Up`, `Down`, `Left`, `Right` arrows | Moves focus to and checks the next/previous radio button in the group. If focus is on the last/first radio button, moves focus to the first/last radio button respectively. The state of the previously checked radio button is changed to unchecked. |

@## Roles & attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in your interfaces.

| Role       | Attribute                   | Element | Usage                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------- | --------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| radiogroup |                             | `div`   | Identifies the `div` element as a container for a group of `radio` buttons. Is not focusable because focus is managed using a roving tabindex strategy as described below.                                                                                                                                                                                                                                                                                               |
|            | `aria-labelledby="[IDREF]"` | `div`   | Refers to the element that contains the label of the radio group.                                                                                                                                                                                                                                                                                                                                                                                                        |
| radio      |                             | `div`   | Identifies the `div` element as an ARIA `radio` button. The accessible name is computed from the child text content of the `div` element.                                                                                                                                                                                                                                                                                                                                |
|            | `tabindex="-1"`             | `div`   | Makes the element focusable but not part of the page `Tab` sequence. Applied to all radio buttons contained in the radio group except for one that is included in the page `Tab` sequence. This approach to managing focus is described in the section on [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_roving_tabindex).                                                                                                                          |
|            | `tabindex="0"`              | `div`   | Makes the radio button focusable and includes it in the page `Tab` sequence. Set on only one radio in the radio group. On page load, is set on the first radio button in the radio group. Moves with focus inside the radio group so the most recently focused radio button is included in the page `Tab` sequence. This approach to managing focus is described in the section on [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_roving_tabindex). |
|            | `aria-checked="false"`      | `div`   | Identifies `radio` buttons which are not checked. CSS attribute selectors (e.g. `[aria-checked="false"]`) are used to synchronize the visual states with the value of the `aria-checked` attribute. The CSS `::before` pseudo-class is used to indicate visual state of unchecked radio buttons to support high contrast settings in operating systems and browsers.                                                                                                     |
|            | `aria-checked="true"`       | `div`   | Identifies `radio` buttons which is checked. CSS attribute selectors (e.g. `[aria-checked="true"]`) are used to synchronize the visual states with the value of the `aria-checked` attribute. The CSS `::before` pseudo-class is used to indicate visual state of checked radio buttons to support high contrast settings in operating systems and browsers.                                                                                                             |

@## Resources

- [W3 radio group examples](https://www.w3.org/TR/wai-aria-practices-1.1/examples/radio/radio-1/radio-1.html) has detailed information about the radio group accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-radio-buttons) gives core recommendations for the accessible radio buttons.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
